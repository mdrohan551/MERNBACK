const EmailSend = require("../utility/EmailHelper");
const {EncodeToken} = require("../utility/TokenHelper");
const UserModel= require('../models/UsersModel')
const ProfilesModel= require('../models/ProfileModel')




const UserOTPService= async (req)=>{
try{
    let email=req.params.email;
    let code=Math.floor(100000+Math.random()*900000);
    let EmailText=`your verification code is ${code}`
    let EmailSubject='Email verification'
    await EmailSend(email,EmailText,EmailSubject);

    await UserModel.updateOne({email:email},{$set:{otp:code}},{upsert:true})
    return {status:"success",message:"6 digit OTP has been send"}
}catch (e) {
    return {status:"fail",message:"some thing wrong"}
}
}
const VerifyOTPService= async (req)=>{
    try{
        let email=req.params.email;
        let otp = req.params.otp;
    // user count
        let total = await UserModel.find({email:email,otp:otp}).countDocuments(('_id'));
    // user token create
        if(total===1){
            let userid=await UserModel.find({email:email,otp:otp}).select('_id')
            let token=EncodeToken(email,userid[0]['_id'].toString())
            // otp update to 0
            await UserModel.updateOne({email},{$set:{otp:0}})
            return{status:'success',message:'valid OTP',token:token}
        }
        else {
            return{status:'fail',message:'something went wrong invalid OTP'}
        }
    }catch (e) {
        return{status:'fail',message:`something went wrong  ${e}`}
    }
    }

const CreateUpdateProfileService= async (req)=>{
try{
    let user_id=req.headers.user_id;
    let reqBody=req.body;
    reqBody.userID=user_id;

    await ProfilesModel.updateOne({userID:user_id},{$set:reqBody},{upsert:true})
   return {status:'success',message:'successfully done'}
}catch (e) {
    return { status:'fail',message:`something went wrong  ${e}`}
}
}

const ReadProfileService= async (req)=>{
   try{
       let user_id=req.headers.user_id;
       let result = await ProfilesModel.find({userID:user_id})
       return {status:'success',data:result}
   }catch (e) {
       return { status:'fail',message:`something went wrong  data not see${e}`}
   }
}


module.exports={
    UserOTPService,
    VerifyOTPService,
    CreateUpdateProfileService,
    ReadProfileService
}