const mongoose=require('mongoose');
const nodemailer=require('nodemailer');

require('dotenv').config();


const fileSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String
    },
    tags:{
        type:String
    },
    email:{
        type:String
    }
});

//post middleware

fileSchema.post("save", async function(doc){//doc is the document that has recently been saved in MongoDB
    try{
        console.log("DOC",doc);

        //transporter
        //shift this configuration under config folder
        let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASSWORD
            }
        });


        //send mail
        let info=await transporter.sendMail({
            from:`Codehelp -by Mandal`,
            to:doc.email,
            subject:"New file uploaded on cloudinary",
            html:`<h2>Hello World</h2><p>File Uploaded</p> View here:<a href="${doc.imageUrl}">${doc.imageUrl}</a>>`
        });

    }catch(error)
    {
        console.error(error);
    }
})

const File=mongoose.model("File",fileSchema);

module.exports=File;