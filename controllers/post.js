const Post = require('../models/Post');
const {BadRequest,NotFound}=require('../errors')

const getAllPosts = async (req,res)=>{
    try{
        const posts = await Post.find({});
        res.status(200).json({posts});
    }catch(err){
        console.log(err);
    }
}

const createPost = async (req,res)=>{
    req.body.createdBy=req.user.userId
    const post = await Post.create(req.body);
    res.status(201).json({msg:"Post was successfully created"})
}

const updatePost = async (req,res,next)=>{
    try{
        const {body:{description},user:{userId},params:{postId}} = req
        if(description.trim()==='')
            throw new BadRequest('This field cannot be empty')
        
        const post = await Post.findByIdAndUpdate({_id:postId,createdBy:userId},{description},{new:true,runValidators:true})
        
        if(!post)
            throw new NotFound(`No post with id ${postId}`)

        res.status(200).json({msg:'Updated'})
    }catch(err){
        next(err)
    }
}
     
const deletePost = async (req,res,next)=>{
    try{
        const {user:{userId},params:{postId}}= req
        const post = await Post.findOneAndRemove({_id:postId,createdBy:userId});

        if(!post)
            throw new BadRequest(`Cannot find any post with the id ${postId}`);

        res.status(200).json({msg:'Succesfuly deleted'})
            
    }catch(err){
        next(err);
    }
    
}

module.exports ={getAllPosts,createPost,updatePost,deletePost};