const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
})

const changePasswordSchema = new Schema({
  currentPassword: { type: String, required: true },
  newPassword: { type: String, required: true },
})


const User = mongoose.model('User', userSchema);
const Password = mongoose.model('Password', changePasswordSchema);

module.exports = { User, Password };