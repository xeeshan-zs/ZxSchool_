import { createContext, useContext, useEffect, useState } from "react";
import { subscribeToAuth, logout } from "../firebase/auth";
import { getUserProfile } from "../firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = subscribeToAuth(async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                // Fetch additional user data (role, onboarding status)
                const profile = await getUserProfile(currentUser.uid);
                setUserData(profile);
            } else {
                setUserData(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        user,
        userData,
        loading,
        logout // Export logout function
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
