const {
    UserOTPService,
    VerifyOTPService,
    CreateUpdateProfileService,
    ReadProfileService

} = require('../services/UserServices')
exports.UserOTP = async (req, res) => {
    let result = await UserOTPService(req);
    return res.status(200).json(result)
}



exports.VerifyLogin = async (req, res) => {
    let result = await VerifyOTPService(req);




    // send browser cookies
    if (result['status'] === 'success') {
        // cookieOption
        let cookieOption = { expires: new Date(Date.now() + 24 * 60 * 60 * 1000), httponly: false }
        // set cookie with Response
        res.cookie('token', result['token'], cookieOption)
        return res.status(200).json(result)
    } else {
        return res.status(200).json({ message: 'fail' })
    }



}



exports.UserLogout = async (req, res) => {
    let cookieOption = { expires: new Date(Date.now() - 24 * 60 * 60 * 1000), httponly: false }
    res.cookie('token', "", cookieOption)
    return res.status(200).json({ status: 'success' })
}










exports.ProfileCreate = async (req, res) => {
    let result = await CreateUpdateProfileService(req);
    return res.status(200).json(result)
}


exports.ProfileUpdate = async (req, res) => {
    let result = await CreateUpdateProfileService(req);
    return res.status(200).json(result)
}









exports.ReadProfile = async (req, res) => {
    let result = await ReadProfileService(req);
    return res.status(200).json(result)
}