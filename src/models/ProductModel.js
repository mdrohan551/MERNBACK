const mongoose=require('mongoose');
const ProductSchema=mongoose.Schema({
    title:{type:String,required:true},
    shortDes:{type:String,required:true},
    Price:{type:String,required:true},
    discount:{type:Boolean,required:true},
    discountPrice:{type:String,required:true},
    image:{type:String,required:true},
    star:{type:String,required:true},
    stock:{type:Boolean,required:true},
    remark:{type:String,required:true},
    categoryID:{type:mongoose.Schema.Types.ObjectId,required:true},
    brandID:{type:mongoose.Schema.Types.ObjectId,required:true},
},
  {timestamps:true,versionKey:false}
)
const ProductModel=mongoose.model('Products',ProductSchema);
module.exports=ProductModel