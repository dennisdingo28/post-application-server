const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide a name"]
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    description:{
        type:String,
        maxlength:80,
        required:[true,'Please tell us about your post']
    }
},{timestamps:true});


module.exports = mongoose.model('allposts',PostSchema);