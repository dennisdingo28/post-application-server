const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide a name'],
        unique:true
    },
    email:{
        type:String,
        required:[true,'Please provide an email'],
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
               'Please provide email'
         ], 
         minlength:5,
         unique:true

    },
    password:{
        type:String,
        required:[true,'Please provide a password'],
        minlength:5
    },
    agreeTerms:{
        type:Boolean,
        required:[true,'You must agree with terms and conditions in order to proceed']
    }
});

UserSchema.pre('save',async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

UserSchema.methods.createJWT = function (){
    return jwt.sign({userId:this._id,name:this.name},process.env.JWT_ENCRYPTION,{expiresIn:process.env.JWT_LIFETIME});
};

UserSchema.methods.comparePass = async function (candiatedPassword){
    const isMatch = await bcrypt.compare(candiatedPassword,this.password);
    return isMatch;
}


module.exports = mongoose.model('User',UserSchema);