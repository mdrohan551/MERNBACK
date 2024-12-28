const mongoose = require('mongoose');

const BrandSchema=mongoose.Schema({
    brandName:{type:String,unique:true,required:true},
    brandImg:{type:String,required:true}







},{timestamps:true,versionKey:false})


const BrandModel=mongoose.model('brands',BrandSchema);
module.exports=BrandModel;