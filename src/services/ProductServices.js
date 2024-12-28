const BrandModel=require('../models/BrandModel')
const CategoryModel=require('../models/CategoryModel')
const ProductSliderModel=require('../models/ProductSliderModel')
const ProductModel=require('../models/ProductModel')
const ProductDetailsModel=require('../models/ProductDetailsModel')
const reviewModel=require('../models/ReviewModel')

// string to object id start
const mongoose = require('mongoose');
const objectID = mongoose.Types.ObjectId;
// string to object id end

// query
const productBrandListService=async ()=>{
try{
   let data = await  BrandModel.find();
    return {status:'success',data:data}

}catch (e){
    return {status:'fail',data:e}.toString()
}
}
const productcategoriListService=async ()=>{
     try{
         let data = await CategoryModel.find()
         return {status:'success',data:data}
     }catch (e){
          return {status:'fail',data:e}.toString()
     }
}
const productsliderListService=async ()=>{
    try{
        let data = await ProductSliderModel.find()
        return {status:'success',data:data}
    }catch (e){
        return {status:'fail',data:e}.toString()
    }
}
// all product

const allProductService=async ()=>{
    try {
        let data = await ProductModel.find()
        return {status:'success',data:data}

    }catch (e){
        return {status:'fail',data:e}.toString()
    }
}














const productlistByBrandService=async (req)=>{
try{
    // convert string to object id
    let BrandID= new objectID(req.params.BrandID);
    let MatchStage={$match:{brandID:BrandID}};
    let joinWithBrandStage={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
    let joinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};


// alo melo data arry theke object a niye asbo this stage follow

    let UnwindBrandStage={$unwind:"$brand"}
    let Unwin$categoriesStage={$unwind:"$category"}


// kon kon data dorkar ar kon kon data dorkar nai
    let projectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}


    let data = await ProductModel.aggregate([
        MatchStage,
        joinWithBrandStage,
        joinWithCategoryStage,
        Unwin$categoriesStage,
        UnwindBrandStage,
        projectionStage,
    ])
    return {status:"success",data:data}
}catch (e) {
    return {status:'fail',data:e}.toString()
}



}
const productlistBycategoriService=async (req)=>{
try {
let categoriID= new objectID(req.params.categoryID);
let MatchStage={$match:{categoryID:categoriID}};
let joinWithBrandStage={$lookup:{from:'brands',localField:"brandID",foreignField:"_id",/*new name*/ as:"brand"}}
let joinWithcategorieStage={$lookup:{from:'categories',localField:"categoryID",foreignField:"_id",/*new name*/ as:"category"}}
let UnwindbrandStage={$unwind:"$brand"}
let UnwindCategoryStage={$unwind:"$category"}
    // ja ja dorkar nai
let projectionStage= {$project: {'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

let data = await ProductModel.aggregate([
    MatchStage,
    joinWithBrandStage,
    joinWithcategorieStage,
    UnwindbrandStage,
    UnwindCategoryStage,
    projectionStage
])


//projectionStage
return {status:'success',data:data}









}catch (e) {
    return {status:'fail',data:e}.toString()
}
}

const productremarkService=async (req)=>{
    try {
        let remark= req.params.remark
        let MatchStage={$match:{remark:remark}};
        let joinWithBrandStage={$lookup:{from:'brands',localField:"brandID",foreignField:"_id",/*new name*/ as:"brand"}}
        let joinWithcategorieStage={$lookup:{from:'categories',localField:"categoryID",foreignField:"_id",/*new name*/ as:"category"}}
        let UnwindbrandStage={$unwind:"$brand"}
        let UnwindCategoryStage={$unwind:"$category"}
        // ja ja dorkar nai
        let projectionStage= {$project: {'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

        let data = await ProductModel.aggregate([
            joinWithBrandStage,
            MatchStage,
            joinWithcategorieStage,
            UnwindbrandStage,
            UnwindCategoryStage,
            projectionStage
        ])
        return {status:'success',data:data}
    }catch (e) {
        return {status:'fail',data:e}.toString()
    }
}










const productBySimilerService=async (req)=>{
try{
let categoryID=new objectID(req.params.categoryID);
 let matchStage={$match:{categoryID:categoryID}};

let limitStage={$limit:10}

 let joinWithBrandStage={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}}
 let joinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}}

 let UnwindBrandStage={$unwind:"$brand"}
 let UnwindCategoryStage={$unwind:"$category"}
 let ProjectionStage={$project:{"brand._id":0,'category._id':0,'brandID':0}}





    let data = await  ProductModel.aggregate([
        matchStage,
        limitStage,
        joinWithBrandStage,
        joinWithCategoryStage,
        UnwindBrandStage,
        UnwindCategoryStage,
        ProjectionStage
    ])
    return {status:"success",data:data}


}catch (e){
 return {status:"fail",data:e}.toString()
}
}







const productlistBykeywordService=async (req)=>{

try{
    let searchRegex={"$regex":req.params.keyword, "$options":"i"};
    let  searchParams=[{title:searchRegex},{shortDes:searchRegex}]
    let searchQuery={$or:searchParams};
    let MacthStage={$match:searchQuery}

    let joinWithBrandStage={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}}
    let joinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}}

    let UnwindBrandStage={$unwind:"$brand"}
    let UnwindCategoryStage={$unwind:"$category"}
    let ProjectionStage={$project:{"brand._id":0,'category._id':0,'brandID':0}}
    let data = await ProductModel.aggregate([
        MacthStage,
        joinWithBrandStage,
        joinWithCategoryStage,
        UnwindBrandStage,
        UnwindCategoryStage,
        ProjectionStage,

    ])
    return {status:"success",data:data}
}catch (e) {
    return {status: "fail", data: e}
}









}

const ListByFilterService=async (req)=>{
    try {
        let matchCondition= {};
        if(req.body['categoryID']){
            matchCondition.categoryID= new objectID(req.body['categoryID']);
        }
        if(req.body['brandID']){
            matchCondition.brandID= new objectID(req.body['brandID'])
        }

        let MatchStage={$match:matchCondition};



let addFieldsStage={
    $addFields: { numericPrice: {$toInt: "$price"}}
};





let priceMin= parseInt(req.body['priceMin']);
let priceMax= parseInt(req.body['priceMax']);

let PriceMatchConditions= {};

if(!isNaN(priceMin)){
   PriceMatchConditions['numericPrice']={$gte:priceMin}
}
//যদি priceMin বৈধ সংখ্যা হয়, তাহলে numericPrice ফিল্ডের জন্য $gte (greater than or equal) শর্ত যোগ করা হয়।
if(!isNaN(priceMax)){
    PriceMatchConditions['numericPrice']={...(PriceMatchConditions['numericPrice'] || {}),$lte:priceMax}
}

        //এখানে ...(PriceMatchConditions['numericPrice'] || {}) ব্যবহার করা হয়েছে আগের শর্তগুলো ($gte) ধরে রাখার জন্য। যদি আগের শর্ত না থাকে, তাহলে এটি খালি অবজেক্ট {} থেকে শুরু করবে।
let PriceMatchStage= {$match:PriceMatchConditions};



        let JoinWithBrandStage= {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let UnwindBrandStage={$unwind:"$brand"}
        let UnwindCategoryStage={$unwind:"$category"}
        let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

let data= await ProductModel.aggregate([
    MatchStage,
    addFieldsStage,
    PriceMatchStage,
    JoinWithBrandStage,
    JoinWithCategoryStage,
    UnwindBrandStage,
    UnwindCategoryStage,
    ProjectionStage
])
        return {status:"success",data:data}
    }catch (e){
        return {status:"fail",data:e}
    }
}


const producDetailsService=async (req)=>{
    try{
        let ProductID=new objectID(req.params.ProductID);
        let matchStage={$match:{_id:ProductID}};
        let joinWithBrandStage={$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}}
        let joinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}}
        let joinWithDetailsStage={$lookup:{from:"productdetails",localField:"_id",foreignField:"productID",as:"Details"}}

        let UnwindBrandStage={$unwind:"$brand"}
        let UnwindCategoryStage={$unwind:"$category"}
        let UnwindDetailsStage={$unwind:"$Details"}
        let projectionStage= {$project: {'brand._id':0,'category._id':0}}


        let data = await  ProductModel.aggregate([
            matchStage,
            joinWithBrandStage,
            joinWithCategoryStage,
            joinWithDetailsStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            UnwindDetailsStage,
            projectionStage
        ])
        return {status:"success",data:data}
    }catch (e) {
        return {status:"fail",data:e}.toString()
    }
}



const productReviewListService=async (req)=>{
  try{
      let ProductID=new objectID(req.params.ProductID);
      let MatchStage={$match:{productID:ProductID}}
      let joinWithProfileStage={$lookup:{from:"profiles",localField:"userID",foreignField:"userID",as:"Profile"}}
      let UnwindProfileStage={$unwind:"$Profile"};
      let projectionStage={$project:{
          'des':1,'rating':1,'Profile.cus_name':1,'_id':1
          }}
let data= await reviewModel.aggregate([
    MatchStage,
    joinWithProfileStage,
    UnwindProfileStage,
    projectionStage
])
   return {status:"success",data:data}
  }catch (e) {
      return {status:"fail",data:e}.toString()
  }
}
// create review services
const CreateReviewService =async (req,res)=>{
    try {
        let user_id=req.headers.user_id;
        let reqBody=req.body;
        let  data = await  reviewModel.create({
            productID:reqBody['productID'],
            userID:user_id,
            des:reqBody['des'],
            rating:reqBody['rating'],
        })

        return {status:"success",data:data}
    }catch (e) {
        return {status:"fail",data:e}.toString()
    }
}

module.exports={

    productBrandListService,
    productcategoriListService,
    productsliderListService,
    allProductService,
    productlistByBrandService,
    productlistBycategoriService,
    productBySimilerService,
    productlistBykeywordService,
    productremarkService,
    ListByFilterService,
    producDetailsService,
    productReviewListService,
    CreateReviewService
}