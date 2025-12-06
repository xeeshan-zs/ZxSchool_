import { db } from '../firebase/config';
import { collection, addDoc, updateDoc, deleteDoc, doc, query, where, getDocs, getDoc, serverTimestamp, orderBy } from 'firebase/firestore';
import { updateReviewStats } from './statsService';

// Submit a new review
export const submitReview = async (userId, userName, rating, comment) => {
    try {
        // Check if user already has a review
        const existingReview = await getUserReview(userId);
        if (existingReview) {
            throw new Error('You have already submitted a review. You can edit it from your dashboard.');
        }

        const reviewData = {
            userId,
            userName,
            rating,
            comment,
            status: 'approved', // Auto-approve reviews
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        };

        await addDoc(collection(db, 'reviews'), reviewData);

        // Update statistics
        await updateReviewStats();

        return { success: true };
    } catch (error) {
        console.error('Error submitting review:', error);
        throw error;
    }
};

// Update existing review
export const updateReview = async (reviewId, data) => {
    try {
        const reviewRef = doc(db, 'reviews', reviewId);
        await updateDoc(reviewRef, {
            ...data,
            updatedAt: serverTimestamp()
        });

        // Update statistics if rating changed
        if (data.rating !== undefined) {
            await updateReviewStats();
        }

        return { success: true };
    } catch (error) {
        console.error('Error updating review:', error);
        throw error;
    }
};

// Delete review
export const deleteReview = async (reviewId) => {
    try {
        await deleteDoc(doc(db, 'reviews', reviewId));
        await updateReviewStats();
        return { success: true };
    } catch (error) {
        console.error('Error deleting review:', error);
        throw error;
    }
};

// Approve review
export const approveReview = async (reviewId) => {
    try {
        await updateDoc(doc(db, 'reviews', reviewId), {
            status: 'approved',
            updatedAt: serverTimestamp()
        });
        await updateReviewStats();
        return { success: true };
    } catch (error) {
        console.error('Error approving review:', error);
        throw error;
    }
};

// Reject review
export const rejectReview = async (reviewId) => {
    try {
        await updateDoc(doc(db, 'reviews', reviewId), {
            status: 'rejected',
            updatedAt: serverTimestamp()
        });
        await updateReviewStats();
        return { success: true };
    } catch (error) {
        console.error('Error rejecting review:', error);
        throw error;
    }
};

// Get user's review
export const getUserReview = async (userId) => {
    try {
        const q = query(collection(db, 'reviews'), where('userId', '==', userId));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
            const doc = snapshot.docs[0];
            return { id: doc.id, ...doc.data() };
        }
        return null;
    } catch (error) {
        console.error('Error fetching user review:', error);
        return null;
    }
};

// Get all reviews with optional filter
export const getAllReviews = async (statusFilter = 'all') => {
    try {
        let q;
        if (statusFilter === 'all') {
            q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
        } else {
            q = query(
                collection(db, 'reviews'),
                where('status', '==', statusFilter),
                orderBy('createdAt', 'desc')
            );
        }

        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return [];
    }
};

// Get approved reviews for display
export const getApprovedReviews = async () => {
    return await getAllReviews('approved');
};
