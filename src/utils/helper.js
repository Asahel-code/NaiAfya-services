const crypto = require('crypto');

const generateOTP = () => {
    let otp = crypto.randomBytes(4).toString('hex');
    return otp;
}

module.exports = {
    generateOTP
}