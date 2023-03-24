const express = require('express')
const router = express.Router()


const {getAllPosts, createPost, updatePost, deletePost} = require('../controllers/post')

router.route('/').get(getAllPosts).post(createPost);
router.route('/:id').patch(updatePost).delete(deletePost)

module.exports = router;