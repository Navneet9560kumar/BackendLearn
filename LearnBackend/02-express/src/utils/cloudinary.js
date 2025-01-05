import{v2 as cloudinary} from 'cloudinary';
import fs from 'fs';




//Configure Cloudinary

cloudinary.config({ 
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
      api_key: process.env.CLOUDINARY_API_KEY, 
      api_secret: process.env.CLOUDINARY_API_SECRET// Click 'View API Keys' above to copy your API secret
  });

  const uploadOnCloudinary = async (localFilePath) => {
      try {
           if(!localFilePath) return null;
           const responce = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
           }
       );
       console.log("File will uplode successfully .File src :"+ responce.url);
//onse the file is uplode, we would like to delete form our server 

fs.unlinkSync(localFilePath)
return responce

      } catch (error) {
            fs.unlinkSync(localFilePath);
            return null;
      }
  }