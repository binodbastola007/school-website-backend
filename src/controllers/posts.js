const Post = require('../models/posts');

const allPosts = async (req, res) => {
    const skipCount = (req.query.page - 1) * 12;
    const data = await Post.find().limit(12).skip(skipCount);
    const totalCount = await Post.find().countDocuments();


    if (data.length > 0) {
        res.json({ data, totalCount });
    }
    else {
        res.json({ msg: "No posts found." });
    }
}


const uploadPost = async (req, res) => {

    try {
        if (!req) {
            return res.status(400).json({ msg: "No file uploaded. Please include an image." });
        }

        const { path, filename } = req.file;
        const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${filename}`;

        const post = {
            postContent: req.body.postContent,
            postImageUrl: fileUrl,
        };
         console.log(post);
        const data = await Post.create(post);


        return res.status(201).json({
            msg: "Post upload successful",
            post: data,
        });
    } catch (err) {
        
        return res.status(500).json({
            msg: "An error occurred while uploading the post. Please try again.",
            error: err.message,
        });
    }
};


const deletePost = async (req, res) => {

    try {
        const data = await Post.deleteOne({ _id: req.params.id });
        if (data) {
            res.json({ msg: "Removed post" });
        }
        else {
            res.json({ msg: "Couln't remove the post" })
        }
    }
    catch (err) {
        console.log(err);
    }

}

const editPost = async (req, res) => {
    try {
        const id = req.params.id;
      
        const { path, filename } = req.file;
        const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${filename}`;

        const updateData = {
            postContent: req.body.postContent,
            postImageUrl: fileUrl,
        };
        const options = { new: true };
        const data = await Post.findByIdAndUpdate(id, updatedData, options);
        if (data) {
            res.json({ msg: "Succesfully updated the post" });
        }
        else {
            res.json({ msg: "Couln't update the post" })
        }
    }
    catch (err) {
        console.log(err);
    }

}

const postDetails = async (req, res) => {
    try {
        const data = await Post.findById(req.params.id);
        if (data) {
            res.json({ data });
        }
        else {
            res.json({ msg: "Couln't find the post details" })
        }
    }
    catch (err) {
        res.json({ msg: "Invalid post id" })
    }

}



module.exports = { allPosts, postDetails, uploadPost, editPost, deletePost };