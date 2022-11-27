const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Defining Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  work: { type: String, required: true },
  password: { type: String, required: true },
  conformPassword: { type: String, required: true },
  date: { type: Date, default: Date.now },
  messages: [{
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    message: { type: String, required: true },
  }],
  tokens: [
    { token: { type: String, require: true } }
  ]
})

// Hashing password
userSchema.pre('save', async function (next) {
  // console.log('Hello from pre save');

  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
    this.conformPassword = await bcrypt.hash(this.conformPassword, 12);
  }
  next();
})

// Generating token
userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error)
  }
}

// store the message
userSchema.methods.addMessage = async function (name, email, phone, message) {
  try {
    this.messages = this.messages.concat({ name, email, phone, message });
    await this.save();
    return this.messages;
  } catch (error) {
    console.log(error);
  }
}

//   Compiling Models / Creating Model
const users = mongoose.model('user', userSchema);
module.exports = users;