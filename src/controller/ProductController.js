const {
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
}= require('../services/ProductServices')

exports.productBrandList=async (req,res)=>{
let result = await productBrandListService();
   return res.status(200).json(result)
}
exports.productcategoriList=async (req,res)=>{
    let result = await productcategoriListService();
    return res.status(200).json(result)
}
exports.productsliderList=async (req,res)=>{
    let result = await productsliderListService();
    return res.status(200).json(result)
}
exports.productAll=async (req,res)=>{
    let result = await allProductService();
    return res.status(200).json(result)
}
exports.productlistByBrand=async (req,res)=>{
  let result=await productlistByBrandService(req);
  return res.status(200).json(result)
}
exports.productlistBycategori=async (req,res)=>{
  let result = await productlistBycategoriService(req);
  return res.status(200).json(result)
}
exports.productremark=async (req,res)=>{
// remark
    let result = await productremarkService(req);
    return res.status(200).json(result)
}
exports.productBySimiler=async (req,res)=>{
    let result = await productBySimilerService(req);
    return res.status(200).json(result)
}
exports.productlistBykeyword=async (req,res)=>{
// search product
   let resul = await productlistBykeywordService(req)
   return res.status(200).json(resul)

}
exports.ProductListByFilter=async (req,res)=>{
// filter product
   let resul = await ListByFilterService(req)
   return res.status(200).json(resul)

}
exports.producDetails=async (req,res)=>{
// details
let result = await producDetailsService(req);
return res.status(200).json(result)
}

exports.productReviewList=async (req,res)=>{
// review
    let result = await productReviewListService(req);
    return res.status(200).json(result)
}
exports.CreateReview=async (req,res)=>{
// review create
    let result = await CreateReviewService(req);
    return res.status(200).json(result)
}
