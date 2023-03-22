const User = require('../models/User');

const register = async (req,res)=>{
    const user = await User.create(req.body);
    const token = user.createJWT();
    res.status(201).json({name:user.name,token});
}


const login = async (req,res)=>{
    const {email,password}=req.body;

    if(!email || !password)
        throw new Error('Bad Request');

    const user = await User.findOne({email});

    if(!user)
        throw new Error('Invalid credintials');
    
    const isMatch = user.comparePass(password);

    if(!isMatch)
        throw new Error('Invalid credintials');
    
    const token = user.createJWT();
    
    res.status(200).json({name:user.name,token});
}

module.exports = {register,login};