const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const path=require('path');
const imageModel=require('./model/image.model');
const { body } = require('express-validator');
const multer = require("multer");
var storage = multer.diskStorage(
    {
        destination: 'public/images',
        filename: function (req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname);
        }
    }
);

var upload = multer({ storage: storage });

const categoryModel=require('./model/category.model');
const userModel=require('./model/user.model');
const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://faizankhan:786786@cluster0.5nhsv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
const { request, response } = require('express');
const port = process.env.PORT || 3000;
const app=express();
app.use(cors());
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/signup',(request,response)=>{
     userModel.create(request.body).then(result=>{
        console.log(result);
        return response.status(200).json(result);
    }).catch(err=>{
        return response.status(500).json({message:'Something went wrong'});
    })
});

app.use('/signin',(request,response)=>{
    userModel.findOne({email:request.body.email,password:request.body.password}).then(result => {
        if (result)
            return response.status(200).json(result);
        else
            return response.status(404).json({ message: 'Invalid user' })
    }).catch(err => {
        return response.status(500).json({ message: 'Oops something went wrong' });
    })
});
 
app.use('/add-category',upload.single('categoryImage'),body('categoryName').not().isEmpty(),(request,response)=>{
    categoryModel.create({
        categoryName:request.body.categoryName,
        categoryImage:"http://localhost:3000/images/"+request.file.filename})
    .then(result=>{
      return response.status(201).json(result);
    }).catch(err=>{
        return response.status(403).json({message:'Opps Something went wrong'});
    });
});


app.use('/imageadd',upload.single('imageAdd'),(request,response)=>{
    imageModel.create({
        imageUrl:"http://localhost:3000/images/"+request.file.filename})
    .then(result=>{
        
      return response.status(201).json(result);
    }).catch(err=>{
       
        return response.status(403).json({message:'Opps ! Something went wrong'});
    });
});

app.listen(port,()=>{
    console.log('server running');
})