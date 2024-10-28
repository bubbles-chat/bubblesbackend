import { UploadApiOptions } from "cloudinary";
import cloudinary from "./cloudinary.config"

export const uploadFile = async (file: string, resourceType: string, folder: string) => {
    try {
        let uploadOptions: UploadApiOptions = { folder };
        switch (resourceType) {
            case 'image':
                uploadOptions.resource_type = 'image';
                break;
            case 'video':
                uploadOptions.resource_type = 'video';
                break;
            case 'raw':
                uploadOptions.resource_type = 'raw';
                break;
            default:
                throw new Error('Unsupported file type');
        }
        return await cloudinary.uploader.upload(file, uploadOptions)
    } catch (e) {
        console.error('uploadFile:', e);
        throw new Error("Failed to upload to cloudinary")
    }
}

export const deleteFile = async (publicId: string) => {
    try {
        return await cloudinary.uploader.destroy(publicId)
    } catch (e) {
        console.error('deleteFile:', e);
        throw new Error("Failed to delete from cloudinary")
    }
}