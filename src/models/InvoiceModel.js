const mongoose = require('mongoose');

const InvoiceSchema=mongoose.Schema({
    userID:{type:mongoose.Schema.Types.ObjectId,required:true},
    payable:{type:String,required:true},
    customer_details:{type:String,required:true},
    ship_details:{type:String,required:true},
    tran_ID:{type:String,required:true},
    valid_ID:{type:String,required:true},
    delivery_status:{type:String,required:true},
    payment_status:{type:String,required:true},
    total:{type:String,required:true},
    vat:{type:String,required:true},


},{timestamps:true,versionKey:false})


const invoiceModel=mongoose.model('invoices',InvoiceSchema);
module.exports=invoiceModel;