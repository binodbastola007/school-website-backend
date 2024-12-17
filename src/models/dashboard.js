const mongoose = require('mongoose');
const { Schema } = mongoose;

const dashboardSchema = new Schema({
    principalImageUrl : [{type:String,required:true}],
    vicePrincipalImageUrl : [{type:String,required:true}],
    teacherCount:{type:Number , required:true},
    studentCount : {type:Number , required:true},
    messageFromPrincipal : {type:String , required:true},
    messageFromVicePrincipal: [{type:String,required:true}],
    ourVision : {type:String , required:true},
    ourMission: {type:String , required:true},
    schoolEmail : [{type:String,required:true}],
    schoolContactNumber : [{type:Number,required:true}],
    schoolLocation : [{type:String,required:true}],
    facebookLink : [{type:String,required:true}],
    schoolLogoImageUrl : [{type:String,required:true}],
  })
const Dashboard = mongoose.model('Dashboard',dashboardSchema); 
  

module.exports=Dashboard;