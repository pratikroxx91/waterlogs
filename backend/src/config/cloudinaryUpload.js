import cloudinary from "./cloudinary.js";

const uploadToCloudinary = (imageData) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: "image" },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
        uploadStream.end(imageData);
    });
};

export default uploadToCloudinary;