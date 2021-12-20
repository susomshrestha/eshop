const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  isAdmin: {
    type: String,
    default: false,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  street: {
    type: String,
  },
  active: {
    type: Boolean,
    default: false,
  },
  activeToken: {
    type: String,
  },
  activeTokenExpire: {
    type: Date,
  },
});

userSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

userSchema.set('toJSON', {
  virtuals: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
