import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const hasCloudinaryConfig = () =>
  Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  );

if (hasCloudinaryConfig()) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
}

export const uploadImageBuffer = (buffer, folder = "photography-cms") =>
  new Promise((resolve, reject) => {
    if (!hasCloudinaryConfig()) {
      reject(new Error("Cloudinary is not configured."));
      return;
    }

    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          alt: "",
          width: result.width,
          height: result.height
        });
      }
    );

    stream.end(buffer);
  });

export const deleteCloudinaryAsset = async (publicId) => {
  if (!publicId || !hasCloudinaryConfig()) {
    return;
  }

  await cloudinary.uploader.destroy(publicId);
};
