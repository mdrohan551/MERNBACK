const mongoose = require('mongoose');
const CartModel=require('../models/CartModel');
const ProfileModel=require("../models/ProfileModel");
const InvoiceModel=require("../models/InvoiceModel");
const InvoiceProductModel=require('../models/InvoiceProductModel');
const paymentSettingModel=require('../models/PaymentSettingModel')
const objectID=mongoose.Types.ObjectId;
const FormData=require('form-data');
const axios=require('axios');
// creat invoice services
const CreateInvoiceService = async (req) =>{
    let User_id=new objectID(req.headers.user_id); // Meanwhile we have set user id and email header in middleware fnc
    let cus_email= req.headers.email
//====================Setp 01 : Calculate Total Payable % vat======================================================>
let MatchStage ={$match:{userID:User_id}}
let joinStageProduct={$lookup:{from:"products",localField:"productID",foreignField:"_id",as:"product"}}
let UnwindProductStage={$unwind:"$product"}



let CartProduct= await CartModel.aggregate([
    MatchStage,joinStageProduct,UnwindProductStage
])

let totalAmount=0;
CartProduct.forEach((element)=>{
  let price;
  if(element['product']['discount']){
      price=parseFloat(element['product']['discountPrice']);
  }
  else {
      price=parseFloat(element['product']['price']);
  }
  totalAmount+=parseFloat(element['qty']) * price;
})
// vat
    let vat = totalAmount*0.05 // 5% vat
    let payable = totalAmount+vat

//====================Setp 02 : Prepare Customer Details & Shipping Details t======================================>
    let Profile = await ProfileModel.aggregate([MatchStage]);
    let cus_details =`Name:${Profile[0]['cus_name']},Email:${cus_email},Address:${Profile[0]['cus_add']},Phone:${Profile[0]['cus_phone']}`
    let ship_details =`Name:${Profile[0]['ship_name']},City:${Profile[0]['ship_city']},Address:${Profile[0]['ship_add']},Phone:${Profile[0]['ship_phone']}`


//====================Setp 03 : Transaction & Other's ID===========================================================>
    let tran_id=Math.floor(10000000*Math.random()*900000);
    let val_id=0;
    let delivery_status='pending';
    let Payment_status="pending";


//====================Setp 04 : Create Invoice=====================================================================>
let createInvoice=await InvoiceModel.create({
    userID:User_id,
    payable:payable,
    customer_details:cus_details,
    ship_details:ship_details,
    tran_ID:tran_id,
    valid_ID:val_id,
    delivery_status:delivery_status,
    payment_status:Payment_status,
    total:totalAmount,
    vat:vat,
})
//====================Setp 05 : Create Invoice Product=============================================================>
let invoiceID=createInvoice['_id'];

    CartProduct.forEach(async (element)=>{
          await InvoiceProductModel.create({
              userID:User_id,
              productID:element['productID'],
              invoiceID:invoiceID,
              qty:element['qty'], //short form => quantity
              price:element['product']['discount']?element['product']['discountPrice']:element['product']['price'],  //inline if else ? :
              color:element['color'],
              size:element['size'],
          })
    })
//====================Setp 06 : Removed Carts======================================================================>
    //কার্ড লিস্ট থেকে কার্ড প্রোডাক্ট ডিলিট করে দিব কেন না আমাদের ইনভইচ হয়ে গেছে
await CartModel.deleteMany({userID:User_id});
//====================Setp 07 : Prepare SSL Payment // ssl = secure sockets Layer =================================>
    let PaymentSettings=await paymentSettingModel.find()


    const form=new FormData();
    form.append('store_id',PaymentSettings[0]['store_id'])
    form.append('store_passwd',PaymentSettings[0]['store_passwd'])
    form.append('total_amount',payable.toString())
    form.append('currency',PaymentSettings[0]['currency'])
    form.append('tran_id',tran_id)

    form.append('success_url',`${PaymentSettings[0]['success_url']}/${tran_id}`)
    form.append('fail_url',`${PaymentSettings[0]['fail_url']}/${tran_id}`)
    form.append('cancel_url',`${PaymentSettings[0]['cancel_url']}/${tran_id}`)
    form.append('ipn_url',`${PaymentSettings[0]['ipn_url']}/${tran_id}`)

    form.append('cus_name',Profile[0]['cus_name'])
    form.append('cus_email',cus_email)
    form.append('cus_add1',Profile[0]['cus_add'])
    form.append('cus_add2',Profile[0]['cus_add'])
    form.append('cus_city',Profile[0]['cus_city'])
    form.append('cus_state',Profile[0]['cus_state'])
    form.append('cus_postcode',Profile[0]['cus_postcode'])
    form.append('cus_country',Profile[0]['cus_country'])
    form.append('cus_phone',Profile[0]['cus_phone'])
    form.append('cus_fax',Profile[0]['cus_phone'])

    form.append('shipping_method',"YES")
    form.append('ship_name',Profile[0]['ship_name'])
    form.append('ship_add1',Profile[0]['ship_add'])
    form.append('ship_add2',Profile[0]['ship_add'])
    form.append('ship_city',Profile[0]['ship_city'])
    form.append('ship_state',Profile[0]['ship_state'])
    form.append('ship_country',Profile[0]['ship_country'])
    form.append('ship_postcode',Profile[0]['ship_postcode'])

    form.append('product_name','According Invoice')
    form.append('product_category','According Invoice')
    form.append('product_profile','According Invoice')
    form.append('product_amount','According Invoice')

    try {
        let SSLRes = await axios.post(PaymentSettings[0]['init_url'], form,{ timeout: 10000 });
        return {status:"success",data:SSLRes.data}
    } catch (err) {
        console.error("SSLCommerz Payment API Error:", err.message);
        return { status: "error", message: err.message };
    }





}





const PaymentSuccessServices = async (req) =>{
try{

let trxID=req.params.trxID;
await InvoiceModel.updateOne({tran_ID:trxID},{payment_status:'success'})

    return {status:'success'}
}catch (e) {
    return {status:'fail',message:"something went Wrong"};

}
}
const PaymentFailServices = async (req) =>{
    try{
       let trxID=req.params.trxID;
       await InvoiceModel.updateOne({tran_ID:trxID},{payment_status:'fail'})
        return {status:'fail'}
    }catch (e) {
        return {status:'fail',message:"something went Wrong"};

    }
}
const PaymentCancelServices = async (req) =>{
    try{
        let trxID=req.params.trxID;
        await InvoiceModel.updateOne({tran_ID:trxID},{payment_status:'cancel'})
        return {status:'cancel'}
    }catch (e) {
        return {status:'fail',message:"something went Wrong"};

    }
}
const PaymentIPNServices = async (req) =>{
    try{
        let trxID=req.params.trxID;
        let status=req.body['status'];
        await InvoiceModel.updateOne({tran_ID:trxID},{payment_status:status})
        return {status:status}
    }catch (e) {
        return {status:'fail',message:"something went Wrong"};

    }
}
const InvoiceListServices = async (req) =>{
    try{
        let user_id=req.headers.user_id;
        let invoice =await InvoiceModel.find({userID:user_id});
        return {status:'success',data:invoice}
    }catch (e) {
        return {status:'fail',message:"something went Wrong"};

    }
}
const InvoiceProductServices = async (req) =>{
    try{
        let user_id=new objectID(req.headers.user_id);
        let invoice_id=new objectID(req.params.invoice_id)
        let matchStage={$match:{userID:user_id,invoiceID:invoice_id}}
        let joinStageProduct={$lookup:{from:"products",localField:"productID",foreignField:"_id",as:"product"}}
        let unwindStage={$unwind:"$product"};
        let products = await InvoiceProductModel.aggregate([
            matchStage,
            joinStageProduct,
            unwindStage,
        ])
        return {status:'success',data:products}
    }catch (e) {
        return {status:'fail',message:"something went Wrong"};

    }
}


module.exports={
    CreateInvoiceService,
    PaymentSuccessServices,
    PaymentFailServices,
    PaymentCancelServices,
    PaymentIPNServices,
    InvoiceListServices,
    InvoiceProductServices
}


