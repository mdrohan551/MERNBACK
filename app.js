const express= require('express');
const router= require('./src/routes/api');
const app = new express();


const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./src/config/config');






// mongodb connect

// let url = "mongodb://localhost:27017/EcommerceFirst";
let url = 'mongodb+srv://root:23456@atlascluster.0du5zcu.mongodb.net/ecommerce';
let options = {
    user:'root',
    pass:'23456',
    autoIndex: true,
    serverSelectionTimeoutMS: 30000 // ৩০ সেকেন্ড
};

mongoose.connect(url, options)
    .then((res) => {
        console.log('DB connect success');
    })
    .catch((err) => {
        console.log(err);

    });

// app use all package
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:2020', 'https://mernback-q1el.onrender.com'], credentials: true }));
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// rate limiter set
const  limiter = rateLimit({windowMs:15*60*1000,max:3000});
app.use(limiter)
// rate limiter set end



// app use all package end
app.use(express.json());
// router + api + add
app.use('/api/v1',router)
// router + api + add end
app.use(express.static('Client/dist'));

// add react front end routing
app.get('*',function (req,res){
    res.sendFile(path.resolve(__dirname,'Client','dist','index.html'))
})
module.exports = app;
