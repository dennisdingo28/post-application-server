const User = require('../models/User');

const register = async (req,res)=>{
    const user = await User.create(req.body);
    res.status(201).json(user);
}


module.exports = {register};