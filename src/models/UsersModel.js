
const mongoose = require('mongoose');

const UserSchema=mongoose.Schema({
    email:{type:String,unique:true,required:true,lowercase:true},
    otp:{type:Number,required:true},
},{timestamps:true,versionKey:false})


const UserModel=mongoose.model('users',UserSchema);
module.exports=UserModel;