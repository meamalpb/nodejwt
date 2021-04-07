const express         = require('express');
const app             = express();
const authRouter      = require('./routes/authRoutes');
const mongoose        = require('mongoose');
const cookieParser    =require('cookie-parser');
const {requireAuth}   = require('./middleware/authMiddleware');

//connect to mongodb cloud
const uri = "mongodb+srv://pbamal:test123@cluster0.trivh.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000,()=>{console.log('http://localhost:3000/')}))
  .catch((err) => console.log(err));


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static('public'));
app.set('view engine', 'ejs'); 



app.get('/',requireAuth,(req,res)=>{
  res.render('main')
})

//use Authroutes
app.use(authRouter)
