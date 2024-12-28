const cartModel=require('../models/CartModel');
const mongoose=require('mongoose');
const objectID=mongoose.Types.ObjectId;



const CartListService =async (req)=>{
    try{
        let user_id= new objectID(req.headers.user_id);
        let matchStage={$match:{userID:user_id}}
        let joinStageProduct={$lookup:{from:"products",localField:"productID",foreignField:"_id",as:"product"}}
        let unwindProductStage={$unwind:"$product"};
        let joinStageBrandStage={$lookup:{from:"brands",localField:"product.brandID",foreignField:"_id",as:"brand"}}
        let unwindBrandStage={$unwind:"$brand"}
        let joinStageCategory={$lookup:{from:"categories",localField:"product.categoryID",foreignField:"_id",as:"category"}}
        let unwindCategoryStage={$unwind:"$category"}




        let projectionStage={$project:{
                '_id':0,"userID":0,'createdAt':0, 'updatedAt':0, 'product._id':0, 'product.brandID':0,  'product.categoryID':0,'brands._id':0,  'category._id':0
            }}
        let data=await cartModel.aggregate([
            matchStage,
            joinStageProduct,
            unwindProductStage,
            joinStageBrandStage,
            unwindBrandStage,
            joinStageCategory,
            unwindCategoryStage,
            projectionStage




        ])








        return {status:'success',data:data}
    }catch (e) {
        return {status:'fail',message:"no  cart."};
    }

}
const addCartServices =async (req)=>{
    try{
         let user_id=req.headers.user_id;
         let reqBody=req.body;
         reqBody.userID=user_id;
         await cartModel.create(reqBody)
        return {status:'success',message:'carts add success'}
    }catch (e) {
        return {status:'fail',message:"Error NO add cart please try Again "};
    }

}
const updateCartServices =async (req)=>{
    try{
       let user_id=req.headers.user_id;
       let cartID=req.params.cartID;

       let reqBody=req.body;
       await cartModel.updateOne({_id:cartID,userID:user_id},{$set:reqBody})
        return {status:'success',message:'carts update success'}
    }catch (e) {
        return {status:'fail',message:"Error NO Update cart please try Again "};
    }

}
const removedCartServices =async (req)=>{
    try{
        let user_id=req.headers.user_id;
        let reqBody=req.body;
        reqBody.userID=user_id //this is concat;
        await cartModel.deleteOne(reqBody)
        return {status:'success',message:'removed cart list success'}
    }catch (e) {
        return {status:'fail',message:"Error en la cart."};
    }

}


module.exports = {
    CartListService,
    addCartServices,
    updateCartServices,removedCartServices
}