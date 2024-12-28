
const mongoose = require('mongoose');

const CartSchema=mongoose.Schema({
    productID:{type:mongoose.Schema.Types.ObjectId,required:true},
    userID:{type:mongoose.Schema.Types.ObjectId,required:true},
    color:{type:String,required:true},
    // price:{type:String,required:true}, this pirce not use security purpus use another js
    qty:{type:String,required:true},//quantity
    size:{type:String,required:true},
},{timestamps:true,versionKey:false})


const CartModel=mongoose.model('cartlists',CartSchema);
module.exports=CartModel;