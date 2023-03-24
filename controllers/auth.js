const User = require('../models/User');

const {BadRequest,Unauthenticated}=require('../errors/index');

const register = async (req,res)=>{

    const user = await User.create(req.body);
    const token = user.createJWT();
    res.status(201).json({name:user.name,token})
}


const login = async (req,res,next)=>{

    try{
        const {email,password}=req.body;

        if(!email || !password)
           throw new BadRequest('Bad Request');
        
           const user = await User.findOne({email});

        if(!user)
            throw new Unauthenticated('Invalid credentials');
        
        const isMatch = await user.comparePass(password);
    
        if(!isMatch)
            throw new Unauthenticated('Invalid credentials');
        
        const token = user.createJWT();
        
        res.status(200).json({name:user.name,token});
    }catch(err){
        next(err);
    }
    
}

module.exports = {register,login};