const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please, tell us your name'],
    trim: true,
    maxlength: [30, 'A user name must have less than or equal 30 characters'],
    minlength: [3, 'A user name must have more than or equal 3 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please, provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please, provide a valid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please, provide your password'],
    minlength: [8, 'A user password must have more than or equal 8 characters'],
    maxlength: [
      50,
      'A user password must have less than or equal 50 characters',
    ],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please, confirm your password'],
    minlength: [8, 'A user password must have more than or equal 8 characters'],
    maxlength: [
      50,
      'A user password must have less than or equal 50 characters',
    ],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
