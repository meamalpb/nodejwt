const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt  = require('bcrypt');


//Schema for user collection
const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      unique: true,
      lowercase: true,
      validator:[isEmail,'Enter valid email']
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: [6, 'Minimum password length is 6 characters'],
    }
  });
const User      = mongoose.model('user',userSchema);

  //hashing pw before saving
userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next()
  })


//static function for logging in
  userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email');
  };




module.exports  = User;