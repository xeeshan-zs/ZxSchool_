import { supabase } from "../lib/supabase";

export const uploadReceipt = async (file, applicationId) => {
    if (!file) return null;

    const fileExt = file.name.split('.').pop();
    const fileName = `${applicationId}_${Date.now()}.${fileExt}`;
    const filePath = `receipts/${fileName}`;

    const { data, error } = await supabase.storage
        .from('receipts')
        .upload(filePath, file);

    if (error) {
        console.error('Supabase upload error:', error);
        throw error;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
        .from('receipts')
        .getPublicUrl(filePath);

    return publicUrl;
};
