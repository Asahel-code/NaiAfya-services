const allowedOrigins = require('../config/allowedOrigins');

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
    }
    else if(origin == undefined){
        res.header('Access-Control-Allow-Credentials', true);
    }
    else {
        return res.status(403).json({ message: 'Unauthorized origin' });
    }
    next();
}

module.exports = credentials