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

}

const updatePost = async (req,res)=>{

}

const deletePost = async (req,res)=>{

}

module.exports ={getAllPosts,createPost,updatePost,deletePost};