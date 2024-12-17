const mongoose = require('mongoose');


async function mongoDbConnection(){
    try{
      const connected = await mongoose.connect('mongodb://127.0.0.1:27017/schooldb');
      if(connected){
        console.log("connected to mongodb");
      }
    
      }
      catch(err){
          console.log(err);
      }
  }

  module.exports = mongoDbConnection;