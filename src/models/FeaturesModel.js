const mongoose = require('mongoose');

const featuresSchema=mongoose.Schema({
    name:{type:String,required:true}, //short form => qty
    description:{type:String,required:true},
    img:{type:String,required:true},
},{timestamps:true,versionKey:false})


const featuresModel=mongoose.model('features',featuresSchema);
module.exports=featuresModel;