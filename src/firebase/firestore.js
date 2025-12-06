import { db } from "./config";
import {
    doc,
    setDoc,
    getDoc,
    collection,
    addDoc,
    getDocs,
    query,
    where,
    serverTimestamp
} from "firebase/firestore";

// User Helpers
export const createUserDocument = async (user, additionalData) => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
        const { email } = user;
        const { name, phone, institute, role } = additionalData;

        try {
            await setDoc(userRef, {
                name,
                email,
                phone: phone || "",
                institute: institute || "",
                role: role || "student",
                onboardingCompleted: false,
                createdAt: serverTimestamp(),
                ...additionalData
            });
        } catch (error) {
            console.error("Error creating user document", error);
        }
    }
};

export const getUserProfile = async (uid) => {
    const userRef = doc(db, "users", uid);
    const snapshot = await getDoc(userRef);
    if (snapshot.exists()) return snapshot.data();
    return null;
};

// Course Helpers
export const getActiveCourses = async () => {
    const coursesRef = collection(db, "courses");
    const q = query(coursesRef, where("active", "==", true));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Application Helpers
export const createApplication = async (applicationData) => {
    const appsRef = collection(db, "applications");
    return addDoc(appsRef, {
        ...applicationData,
        status: "pending",
        timestamp: serverTimestamp()
    });
};
