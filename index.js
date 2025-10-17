//app create
const express=require('express');
const app=express();

//port find
require('dotenv').config();
const PORT=process.env.PORT || 4000;

//middleware add
app.use(express.json());
//we need to install 3rd party middleware package to ensure interaction between express app and file
const fileUpload=require('express-fileupload');
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

//db connect
const connect=require('./config/database');
connect();

//cloud connect
const cloudinary=require('./config/cloudinary');
cloudinary.cloudinaryConnect();


//api route mount
const Upload=require('./routes/FileUpload');
app.use("/api/v1/upload",Upload);

//activate server
app.listen(PORT,()=>{
    console.log(`App is running at port ${PORT}`);
});