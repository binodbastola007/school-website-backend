const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  postTitle: [{ type: String, required: true }],
    postContent : [{type:String,required:true}],
    postImageUrl : [{type:String,required:true}],
}, {
  timestamps: true,
})
const Posts = mongoose.model('Posts',postSchema); 
  

module.exports=Posts;