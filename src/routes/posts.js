const express = require('express');
const router = express.Router();
const {
    uploadPost,
    allPosts,
    deletePost,
    editPost,
    postDetails,

} = require('../controllers/posts');
const { upload } = require('../middlewares/imageUpload');


router.post('/post-upload', upload.single('postImageUrl'), uploadPost);
router.patch('/post-upload/:id', upload.single('postImageUrl'), editPost);
router.get('/all-posts', allPosts);
router.get('/posts/:id', postDetails);
router.delete('/posts/:id', deletePost);


module.exports = router;