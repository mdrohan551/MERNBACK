
const WishListModel=require('../models/WishListModel')
const mongoose=require('mongoose');
const objectId=mongoose.Types.ObjectId;
const wishListServices=async (req)=>{
try{
    // get token to user id in header || cookies
let user_id = new objectId(req.headers.user_id);
// matching userID=user_id
let matchStage={$match:{userID:user_id}}
    // join productID+product
let joinStageProduct={$lookup:{from:"products",localField:"productID",foreignField:"_id",as:"product"}}
    // [] to {} unwind
let UnWindProductStage={$unwind:"$product"}
    // join brandID+brands
let joinStageBrands={$lookup:{from:"brands",localField:"product.brandID",foreignField:"_id",as:"brands"}}
    // [] to {} unwind
let unWindBrandStage={$unwind:"$brands"}
    // join categoryID+category
let joinStageCategory={$lookup:{from:"categories",localField:"product.categoryID",foreignField:"_id",as:"category"}};
    // [] to {} unwind
let unWindCategoryStage={$unwind:"$category"}

// projection mean bad deya
 let projectionStage={
    $project:{
        '_id':0,"userID":0,'createdAt':0, 'updatedAt':0, 'product._id':0, 'product.brandID':0,  'product.categoryID':0,'brands._id':0,  'category._id':0
    }
 }
let data = await WishListModel.aggregate([
    matchStage,
    joinStageProduct,
    UnWindProductStage,
    joinStageBrands,
    unWindBrandStage,
    joinStageCategory,
    unWindCategoryStage,
    projectionStage
])
    return {status:'success',data:data}
}catch (e) {
    return {status:'fail',message:`something went wrong ${e}`}
}
}


const addWishServices=async (req)=>{
   try{
       let user_id=req.headers.user_id;
       let reqBody=req.body;
       reqBody.userID=user_id
       await WishListModel.updateOne(reqBody,{$set:reqBody},{upsert:true})
       return {status:'success',message:'wish list add'}
   }catch (e) {
       return {status:'fail',message:`something went wrong ${e}`}
   }
}




const RemovedWishService=async (req)=>{
    try{
        let user_id=req.headers.user_id;
        let productID = req.body.productID
        await WishListModel.deleteOne({userID:user_id,productID:productID})
        return {status:'success',message:'wish list removed'}
    }catch (e) {
        return {status:'success',message:`something went wrong ${e}`}
    }
}

module.exports={
    wishListServices,
    addWishServices,
    RemovedWishService
}