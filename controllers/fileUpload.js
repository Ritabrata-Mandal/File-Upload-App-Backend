const File=require('../model/File');
const cloudinary=require('cloudinary').v2;

exports.localFileUpload = async(req,res)=>{
    try{
        //fetch
        const file=req.files.file;//fetch file from request
        console.log("File:",file);

        //create path where file needs to be stored on server
        //path to current directory + 'files' folder + Date.now() will be the document name->in miliseconds(will always be unique) + extension(.jpg,.png etc....)
        let path=__dirname+"/files/"+Date.now()+`.${file.name.split('.')[1]}`;//last part is to get the extension
        console.log("PATH->",path);

        //add path to move function
        //mandatory, we want to move the file to the given path
        file.mv(path,(err)=>{
            console.log(err);
        });

        res.json({
            success:true,
            message:'Local file uploaded successfully'
        });

    }catch(error)
    {
        console.log("Not able to upload file on server");
        console.log(error);
    }
}



//image upload handler

function isFileTypesSupported(type,supportedTypes)
{
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file,folder,quality){
    const options={folder};//const options = { folder: folder };


    if(quality){//if there is valid value in quality
        options.quality=quality;
    }

    //necessary
    options.resource_type="auto";
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}



exports.imageUpload= async(req,res)=>{
    try{
        //data fetch
        const {name,tags,email}=req.body;
        console.log(name,tags,email);

        const file=req.files.imageFile;
        console.log(file);

        //validation 
        const supportedTypes=["jpg","jpeg","png"];
        const fileType=file.name.split('.')[1].toLowerCase();
        console.log("File Type:",fileType);

        if(!isFileTypesSupported(fileType,supportedTypes))
        {
            return res.status(400).json({
                success:false,
                message:'File format not supported'
            });
        }

        //file format supported
        //Upload to Clodinary

        const response=await uploadFileToCloudinary(file,"Backend");//Second argument is the name of the folder you created in cloudinary
        console.log(response);

        //save entry in DB
       const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        });


        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image successfully uploaded"
        });

    }catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:'Something went wrong'
        });
    }
}

//video upload

exports.videoUpload=async(req,res)=>{
    try{
        const {name,tags,email}=req.body;
        console.log(name,tags,email);

        const file=req.files.videoFile;
        console.log(file);

        //validation 
        const supportedTypes=["mp4","mov"];
        const fileType=file.name.split('.')[1].toLowerCase();
        console.log("File Type:",fileType);

        //Add a upper limit of 5MB for video
        if(!isFileTypesSupported(fileType,supportedTypes))
        {
            return res.status(400).json({
                success:false,
                message:'File format not supported'
            });
        }


        //file format supported
        //Upload to Clodinary

        const response=await uploadFileToCloudinary(file,"Backend");//Second argument is the name of the folder you created in cloudinary
        console.log(response);

        //save entry in DB
       const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Video successfully uploaded"
        });

    }catch(error)
    {
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong"
        });
    }
}


// image size reduce

exports.imageSizeReducer=async(req,res)=>{
    try{
        //data fetch
        const {name,tags,email}=req.body;
        console.log(name,tags,email);

        const file=req.files.imageFile;
        console.log(file);

        //validation 
        const supportedTypes=["jpg","jpeg","png"];
        const fileType=file.name.split('.')[1].toLowerCase();
        console.log("File Type:",fileType);

        if(!isFileTypesSupported(fileType,supportedTypes))
        {
            return res.status(400).json({
                success:false,
                message:'File format not supported'
            });
        }

        //file format supported
        //Upload to Clodinary

        //HW: Todo using height attribute
        const response=await uploadFileToCloudinary(file,"Backend",10);//Second argument is the name of the folder you created in cloudinary
        console.log(response);

        //save entry in DB
       const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        });


        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image successfully uploaded"
        });

    }catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong"
        });
    }
}