const cloudinary=require('cloudinary').v2;

require('dotenv').config();


exports.cloudinaryConnect=()=>{
    try{//for cloudinary connection cloud name, api_key and api_secret are necessary
        cloudinary.config({
            cloud_name:process.env.CLOUD_NAME,
            api_key:process.env.API_KEY,
            api_secret:process.env.API_SECRET
        })
    }catch(error){
        console.log(error);
    }
}