
const verifyAccountTemplate = (otp) => {
    return `Your otp is: ${otp}`;
};

const staffPasswordTemplate = (credentials) => {
    return `
    Your phone number is: ${credentials.phoneNumber}
    Your password is:${credentials.password}
    `;
};

const fogortPasswordTemplate = (otp) => {
    return `
    Your currrent password is: ${otp}
    `;
};



module.exports = {
    verifyAccountTemplate,
    staffPasswordTemplate,
    fogortPasswordTemplate
}