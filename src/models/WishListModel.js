
const mongoose = require('mongoose');

const wishSchema=mongoose.Schema({
    productID:{type:mongoose.Schema.Types.ObjectId,required:true},
    userID:{type:mongoose.Schema.Types.ObjectId,required:true},



},{timestamps:true,versionKey:false})


const wishModel=mongoose.model('wishList',wishSchema);
module.exports=wishModel;