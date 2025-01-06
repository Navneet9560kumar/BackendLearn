import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) {
    console.error("No file path provided for upload.");
    return null;
  }

  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("File uploaded successfully. File URL:", response.url);

    try {
      await fs.unlink(localFilePath);
      console.log("Local file deleted successfully.");
    } catch (unlinkError) {
      console.error("Error deleting local file:", unlinkError);
    }

    return response;
  } catch (uploadError) {
    console.error("Error uploading to Cloudinary:", uploadError);

    try {
      await fs.unlink(localFilePath);
      console.log("Local file deleted after upload failure.");
    } catch (unlinkError) {
      console.error("Error deleting local file after upload failure:", unlinkError);
    }

    return null;
  }
};


const deletedOnCloudinary = async (publicId) => {
    try {
      const result =  await cloudinary.uploader.destroy(publicId)
      console.log("Deleted file from cloudinary", result)
    } catch (error) {
        console.log("Error deleting file from cloudinary", error)
        return null

    }
}

export { uploadOnCloudinary, deletedOnCloudinary };
