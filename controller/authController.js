const User = require('../models/users')
const jwt =  require('jsonwebtoken');
const maxAge = 3 * 24 * 60 * 60;

//create jwt
const createToken = (id) => {
  return jwt.sign({ id }, 'supersecrettoken', {expiresIn: maxAge});
};

//handleErrors
const handleErrors = (err) => {
    let errors = { email: '', password: '' };
  
    // duplicate email error
    if (err.code === 11000) {
      errors.email = 'that email is already registered';
      return errors;
    }
    
  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
     // console.log(val);
     // console.log(properties);
      errors[properties.path] = properties.message;
    });
}
return errors;
}

//Logout
module.exports.get_logout = (req,res) => {
  res.cookie('jwt','',{maxAge:1});
  res.redirect('/');
}


//Login routes
module.exports.get_login = (req,res) => {
  res.render('login')
}

module.exports.post_login = async (req,res) => {
  const {email,password} = req.body
  try{
     const user = await User.login(email,password);
     const token = createToken(user._id);
     res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
     res.redirect('/')

  }
  catch(err){
    console.log(err)
  }

}


//signup Routes
module.exports.get_signup = (req,res) => {
  res.render('signup')
}

module.exports.post_signup = async (req,res)=>{
  const {email,password} = req.body
  try{
      const user = await User.create({email,password});
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.redirect('/')
      
  }
  catch(err){
     console.log((handleErrors(err)));
     res.redirect('/signup')
  }
}




