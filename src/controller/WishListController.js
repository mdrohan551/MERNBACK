const {
    wishListServices,
    addWishServices,
    RemovedWishService
}=require('../services/WishListServices')

exports.WishList=async (req,res)=>{
    let result = await wishListServices(req);
    return res.status(200).json(result)
}
exports.addWish=async (req,res)=>{
    let result = await addWishServices(req);
    return res.status(200).json(result)
}

exports.RemovedWish=async (req,res)=>{
    let result = await RemovedWishService(req);
    return res.status(200).json(result)
}