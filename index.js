const path  = require('path');

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const authRoutes = require('./routes/auth')
const errorController = require('./controllers/error')
const User = require('./models/user')

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb+srv://david:zh4K6CWu4XnwhoC1@cluster0.xxfws.mongodb.net/shop?retryWrites=true&w=majority';
const MONGODB_URI = process.env.MONGODB_URL || 'mongodb+srv://david:zh4K6CWu4XnwhoC1@cluster0.xxfws.mongodb.net/shop';

const store = new MongoDBStore({
  uri : MONGODB_URI,
  collection: 'sessions'

})


const cors = require('cors') // Place this with other requires (like 'path' and 'express')
const corsOptions = {
    origin: "https://cse341ecommerceapp.herokuapp.com/",
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    //useCreateIndex: true,
    //useFindAndModify: false,
    family: 4
};

                        


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

//app.set('view engine', 'pug');
app.set('view engine', 'ejs');
app.set('views','views');


app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"public")));
app.use(
  session({
  secret: 'my secret', 
  resave : false ,
  saveUninitialized: false,
  store: store,
}
));


app.use((req,res,next)=>{
  if(!req.session.user){
    return next()
  }
  User.findById(req.session.user._id)
  .then(user=>{
    req.user= user;
    next()
  })
  .catch(e=> console.log(e))
})



app.use('/admin',adminRoutes.routes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);


mongoose
.connect(MONGODB_URL, options)
.then(result=>{
  User.findOne().then(user =>{ if(!user){

    const user = new User({
      name: 'david',
      email: 'davidxsteven@gmail.com',
      cart:{
        items:[ ]
      }
    })
    user.save()
    
  }})
  app.listen(port)
})
.catch(e=> console.log(e))


