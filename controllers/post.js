const Post = require('../models/Post');

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

const updatePost = async (req,res)=>{

}

const deletePost = async (req,res)=>{

}

module.exports ={getAllPosts,createPost,updatePost,deletePost};