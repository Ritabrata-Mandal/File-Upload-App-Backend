const mongoose=require('mongoose');


require('dotenv').config();

const connect=()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(console.log('Database connected successfully'))
    .catch((error)=>{
        console.log('DB connection error');
        console.error(error.message);
        process.exit(1);
    });
}

module.exports=connect;