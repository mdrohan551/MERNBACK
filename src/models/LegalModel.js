const mongoose = require("mongoose");
const DataSchema=mongoose.Schema({
    type:{type:String,required:true,unique:true},
    description:{type:String,required:true}
},{timestamps: true,versionKey:false});
const LegalModel=mongoose.model('Legals',DataSchema)
module.exports=LegalModel;