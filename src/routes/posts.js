const express = require('express');
const router = express.Router();
const { uploadPost ,allPosts, deletePost } = require('../controllers/posts');
const { upload } = require('../middlewares/imageUpload');


router.post('/post-upload',upload.single('postImage'), uploadPost);
router.get('/all-posts', allPosts);
router.delete('/posts/:id', deletePost);


module.exports = router;