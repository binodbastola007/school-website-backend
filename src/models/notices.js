const mongoose = require('mongoose');
const { Schema } = mongoose;

const noticesSchema = new Schema({
    noticeTitle : [{type:String,required:true}],
    noticeDescription : [{type:String,required:true}],
    uploadDate : [{type:Date,required:true}],

  })
const Notices = mongoose.model('Notices',noticesSchema); 
  

module.exports=Notices;