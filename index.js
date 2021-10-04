const path  = require('path');

const express = require('express');
const bodyParser = require('body-parser');

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
const app = express();

//app.set('view engine', 'pug');
app.set('view engine', 'ejs');
app.set('views','views');

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const errorController = require('./controllers/error')
const mongoConnect = require('./utils/database')

app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,"public")));

app.use('/admin',adminRoutes.routes);
app.use(shopRoutes);

app.use(errorController.get404);


mongoConnect((client)=>{
  console.log(client);
  app.listen(port);
})


