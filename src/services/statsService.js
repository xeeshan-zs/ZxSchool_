import { db } from '../firebase/config';
import { doc, getDoc, setDoc, updateDoc, increment, serverTimestamp } from 'firebase/firestore';

const STATS_DOC_ID = 'main';

// Initialize stats document if it doesn't exist
export const initializeStats = async () => {
    const statsRef = doc(db, 'siteStats', STATS_DOC_ID);
    const statsDoc = await getDoc(statsRef);

    if (!statsDoc.exists()) {
        await setDoc(statsRef, {
            studentCount: 0,
            reviewCount: 0,
            averageRating: 0,
            lastUpdated: serverTimestamp()
        });
    }
};

// Get current statistics
export const getStats = async () => {
    try {
        const statsRef = doc(db, 'siteStats', STATS_DOC_ID);
        const statsDoc = await getDoc(statsRef);

        if (statsDoc.exists()) {
            return statsDoc.data();
        } else {
            await initializeStats();
            return {
                studentCount: 0,
                reviewCount: 0,
                averageRating: 0
            };
        }
    } catch (error) {
        console.error('Error fetching stats:', error);
        return {
            studentCount: 50,
            reviewCount: 70,
            averageRating: 4.9
        };
    }
};

// Increment student count (called on signup)
export const incrementStudentCount = async () => {
    try {
        const statsRef = doc(db, 'siteStats', STATS_DOC_ID);
        await updateDoc(statsRef, {
            studentCount: increment(1),
            lastUpdated: serverTimestamp()
        });
    } catch (error) {
        console.error('Error incrementing student count:', error);
        await initializeStats();
        await incrementStudentCount();
    }
};

// Recalculate review statistics
export const updateReviewStats = async () => {
    try {
        const { collection, query, where, getDocs } = await import('firebase/firestore');

        // Get all approved reviews
        const reviewsRef = collection(db, 'reviews');
        const q = query(reviewsRef, where('status', '==', 'approved'));
        const snapshot = await getDocs(q);

        const reviewCount = snapshot.size;
        let totalRating = 0;

        snapshot.forEach(doc => {
            totalRating += doc.data().rating;
        });

        const averageRating = reviewCount > 0 ? (totalRating / reviewCount).toFixed(1) : 0;

        const statsRef = doc(db, 'siteStats', STATS_DOC_ID);
        await updateDoc(statsRef, {
            reviewCount,
            averageRating: parseFloat(averageRating),
            lastUpdated: serverTimestamp()
        });

        return { reviewCount, averageRating };
    } catch (error) {
        console.error('Error updating review stats:', error);
        throw error;
    }
};

// Manual update for admin (override specific stat)
export const manualUpdateStats = async (field, value) => {
    try {
        const statsRef = doc(db, 'siteStats', STATS_DOC_ID);
        await updateDoc(statsRef, {
            [field]: value,
            lastUpdated: serverTimestamp()
        });
    } catch (error) {
        console.error('Error manually updating stats:', error);
        throw error;
    }
};
