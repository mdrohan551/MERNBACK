const jwt = require('jsonwebtoken');
const {JWT_KEY} = require("../config/config");

exports.EncodeToken=(email,user_id)=>{
  let key=JWT_KEY;
  let Expire ={expiresIn: '24h'}
  let payload = {
      email:email,
      user_id:user_id
  }
  return jwt.sign(payload,key,Expire)





}
exports.DecodeToken=(token)=>{
    try{
        let key = JWT_KEY;
        return jwt.verify(token,key)
    }catch (e) {
       return null
    }
}