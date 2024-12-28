const mongoose = require('mongoose');

const paymentSettingSchema=mongoose.Schema({
    store_id:{type:String,required:true}, //short form => qty
    store_passwd:{type:String,required:true},
    currency:{type:String,required:true},
    success_url:{type:String,required:true},
    fail_url:{type:String,required:true},
    cancel_url:{type:String,required:true},
    ipn_url:{type:String,required:true},
    init_url:{type:String,required:true},


},{timestamps:true,versionKey:false})


const paymentSettingModel=mongoose.model('paymentsettings',paymentSettingSchema);
module.exports=paymentSettingModel;