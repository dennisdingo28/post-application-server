const jwt = require('jsonwebtoken')
const {Unauthenticated}=require('../errors');

const authenticate = async (req,res,next) =>{
    
    try{
        const authHeader = req.headers.authorization;
    
        if(!authHeader || !authHeader.startsWith('Bearer')){
            throw new Unauthenticated('Authentication Invalid')
        }

        const token = authHeader.split(' ')[1]
        const payload = await jwt.verify(token,process.env.JWT_ENCRYPTION);
        req.user = {userId:payload.userId,name:payload.name}
        next();

    }catch(err){
        next(err);
    }
}

module.exports = authenticate