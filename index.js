const path  = require('path');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const errorController = require('./controllers/error')
const User = require('./models/user')


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
const app = express();

//app.set('view engine', 'pug');
app.set('view engine', 'ejs');
app.set('views','views');


app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"public")));

app.use((req,res,next)=>{
  User.findById('615e45979b5fa054f27bae16')
  .then(user=>{
    req.user =user;
    next()
  }).catch(e=>console.log(e))
});

app.use('/admin',adminRoutes.routes);
app.use(shopRoutes);

app.use(errorController.get404);


mongoose
.connect('mongodb+srv://david:zh4K6CWu4XnwhoC1@cluster0.xxfws.mongodb.net/shop?retryWrites=true&w=majority')
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


