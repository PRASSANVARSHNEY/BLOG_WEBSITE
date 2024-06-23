const express = require('express');

const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');

app.use(cors())
const corsOptions = {
    origin: '*',
    credential : true,
};

app.use(cors(corsOptions));

const ConnectDB = async()=> {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}