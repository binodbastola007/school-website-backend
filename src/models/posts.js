const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    postContent : [{type:String,required:true}],
    postImageUrl : [{type:String,required:true}],
  })
const Posts = mongoose.model('Posts',postSchema); 
  

module.exports=Posts;