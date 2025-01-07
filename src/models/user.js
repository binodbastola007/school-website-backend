const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  currentPassword: { type: String },
  newPassword: { type: String },
  role: { type: String },
})

const permissionSchema = new Schema({
  email: { type: String, required: true },
  role: { type: String, required: true },
  permissions: { type: [String], required: true },
});


const User = mongoose.model('User', userSchema);
const Permission = mongoose.model('Permission', permissionSchema);

module.exports = { User, Permission };