const mongoose =require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
  });
  const User = mongoose.model('user',UserSchema); //Here in database the collection will be pluralized from user to users and will get stored
  module.exports = User;