const featuresModel=require("../models/FeaturesModel");
const e = require("express");
const LegalModel = require("../models/LegalModel");
const FeaturesListService=async () =>{
    try{
        let data= await featuresModel.find();
        return {status:"success",data:data}
    }
    catch (e){}
    return {status:'fail',data:e}.toString()
}
const LegalDetailsService=async (req)=>{
    try{
        let type=req.params.type;
        let data = await LegalModel.find({type:type});
        return{status:"success",data:data}
    }catch (e){
        return {status:'fail',data:e}.toString()
    }
}

module.exports={
    FeaturesListService,
    LegalDetailsService
};