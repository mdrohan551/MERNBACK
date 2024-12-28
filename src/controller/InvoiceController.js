const{    CreateInvoiceService,
    PaymentSuccessServices,
    PaymentFailServices,
    PaymentCancelServices,
    PaymentIPNServices,
    InvoiceListServices,
    InvoiceProductServices} =require("../services/InvoiceServices");
// call invoice services fnc




// create invoice
exports.CreateInvoices=async (req,res) => {
    let result= await CreateInvoiceService(req);
    return res.status(200).json(result);
}
// Payment success
exports.PaymentSuccess=async (req,res)=>{
    let result= await PaymentSuccessServices(req);
    // res.redirect('/orders');
   return  res.redirect('http://localhost:5173/orders')
}
// Payment Fail
exports.PaymentFail=async (req,res)=>{
    let result =await PaymentFailServices(req);
    // return res.redirect('/orders');
   return  res.redirect('http://localhost:5173/orders')
}
// payment cancel
exports.PaymentCancel=async (req,res)=>{
    let result =await PaymentCancelServices(req);
    // return res.redirect('/orders')
   return  res.redirect('http://localhost:5173/orders')
}
// instant Payment notification
exports.PaymentIPN=async (req,res)=>{
    let rsult = await PaymentIPNServices(req)
    return res.status(200).json(rsult)
}

// invoice list
exports.InvoiceList=async (req,res)=>{
    let result =await InvoiceListServices(req);
    return res.status(200).json(result)
}

// Invoice Product list services
exports.InvoiceProductList=async (req,res)=>{
    let result = await InvoiceProductServices(req);
    return res.status(200).json(result)
}