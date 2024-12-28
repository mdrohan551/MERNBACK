
const mongoose = require('mongoose');

const reviewSchema=mongoose.Schema({
    productID:{type:mongoose.Schema.Types.ObjectId,required:true},
    userID:{type:mongoose.Schema.Types.ObjectId,required:true},
    des:{type:String,required:true},
    rating:{type:String,required:true},

},{timestamps:true,versionKey:false})


const reviewModel=mongoose.model('reviews',reviewSchema);
module.exports=reviewModel;