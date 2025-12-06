import { supabase } from '../lib/supabase';

// Upload instructor image to Supabase Storage
export const uploadInstructorImage = async (file) => {
    try {
        // Create unique filename
        const timestamp = Date.now();
        const fileExt = file.name.split('.').pop();
        const filename = `${timestamp}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `instructors/${filename}`;

        // Upload file to Supabase Storage
        const { data, error } = await supabase.storage
            .from('images')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false
            });

        if (error) throw error;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('images')
            .getPublicUrl(filePath);

        return publicUrl;
    } catch (error) {
        console.error('Error uploading instructor image:', error);
        throw error;
    }
};

// Delete instructor image from Supabase Storage
export const deleteInstructorImage = async (imageUrl) => {
    try {
        if (!imageUrl) return;

        // Extract path from URL
        // URL format: https://{project}.supabase.co/storage/v1/object/public/images/{path}
        const urlParts = imageUrl.split('/images/');
        if (urlParts.length < 2) return;

        const filePath = `instructors/${urlParts[1]}`;

        const { error } = await supabase.storage
            .from('images')
            .remove([filePath]);

        if (error) throw error;
    } catch (error) {
        console.error('Error deleting instructor image:', error);
        // Don't throw error - image might already be deleted
    }
};

// Upload course image to Supabase Storage
export const uploadCourseImage = async (file) => {
    try {
        const timestamp = Date.now();
        const fileExt = file.name.split('.').pop();
        const filename = `${timestamp}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `courses/${filename}`;

        const { data, error } = await supabase.storage
            .from('images')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false
            });

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
            .from('images')
            .getPublicUrl(filePath);

        return publicUrl;
    } catch (error) {
        console.error('Error uploading course image:', error);
        throw error;
    }
};

// Delete course image from Supabase Storage
export const deleteCourseImage = async (imageUrl) => {
    try {
        if (!imageUrl) return;

        const urlParts = imageUrl.split('/images/');
        if (urlParts.length < 2) return;

        const filePath = `courses/${urlParts[1]}`;

        const { error } = await supabase.storage
            .from('images')
            .remove([filePath]);

        if (error) throw error;
    } catch (error) {
        console.error('Error deleting course image:', error);
    }
};
