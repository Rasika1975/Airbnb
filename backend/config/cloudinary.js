import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


const uploadCloudinary = async (filepath) =>{
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });


    try{
        if(!filepath){
            return null}
            const uploadResult = await cloudinary.uploader.upload(filepath)
            fs.unlinkSync(filepath);
            
            return {
                url: uploadResult.secure_url,
                public_id: uploadResult.public_id
            }

    }catch(error){
       fs.unlinkSync(filepath);
       console.error("Cloudinary upload error:", error);
    }
}

export default uploadCloudinary;
