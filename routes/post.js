const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/authenticated');


const {getAllPosts, createPost, updatePost, deletePost} = require('../controllers/post')

router.route('/').get(getAllPosts).post(authenticate,createPost);
router.route('/:postId').patch(authenticate,updatePost).delete(authenticate,deletePost)

module.exports = router;