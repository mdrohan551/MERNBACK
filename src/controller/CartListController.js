const {CartListService,
    addCartServices,
    updateCartServices,
    removedCartServices}=require('../services/CartListServices');
exports.CartList=async (req,res)=>{
    let result = await CartListService(req)
    return res.status(200).json(result)

}
exports.addCartList=async (req,res)=>{
    let result = await addCartServices(req)
    return res.status(200).json(result)
}
exports.updateCartList=async (req,res)=>{
    let result = await updateCartServices(req)
    return res.status(200).json(result)
}
exports.removedCartList=async (req,res)=>{
    let result = await removedCartServices(req)
    return res.status(200).json(result)
}