const path  = require('path');

const express = require('express');
const bodyParser = require('body-parser');


const port = Process.env.PORT || 3000 ;
//const port = 3000 ;


const app = express();

//app.set('view engine', 'pug');
app.set('view engine', 'ejs');
app.set('views','views');

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const errorController = require('./controllers/error')



app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,"public")));

app.use('/admin',adminRoutes.routes);
app.use(shopRoutes);

app.use(errorController.get404);




app.listen(port);

