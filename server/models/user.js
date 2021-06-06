const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  studentid: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
    trim: true,
  },
  department: {
    type: String,
    required: true,
    trim: true,
  },
  session: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minlength: 4,
  },
  pic: {
    type: String,
  },
  activeToken: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isTeacher: {
    type: Boolean,
    default: false,
  },
  resetToken: {
    type: String,
  },
  expireToken: {
    type: Date,
  },
  following: [{ type: ObjectId, ref: 'User' }],
  followers: [{ type: ObjectId, ref: 'User' }],
});

const User = mongoose.model('User', userSchema);
module.exports = User;
