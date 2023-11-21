require('dotenv').config();

const allowedOrigins = [
    process.env.APP_DEV_URL,
    process.env.APP_PROD_URL,
];

module.exports = allowedOrigins;