const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message: 'No token, authorization denied'})
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if(err){
            return res.status(401).json({message: 'Token is not valid'})
        }
        req.userId = decodedToken.id;
        next();
    })
}

module.exports = verifyToken;