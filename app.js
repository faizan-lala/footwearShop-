const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const adminRoute=require('./routes/adminroute');
const adminCategory=require('./routes/admincategory.route');
const adminProduct=require('./routes/adminproduct.route');
const jwt = require('jsonwebtoken');
const token = require('./middleware/token.varification');
const path = require('path');


const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://faizankhan:786786@cluster0.5nhsv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
                 
const { request, response } = require('express');
const port = process.env.PORT || 3000;
 const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/admin',adminRoute);
app.use('/admin-category',adminCategory);
app.use('/admin-product',adminProduct);
app.listen(port, () => {
    console.log('server running');
})

module.exports=app;


