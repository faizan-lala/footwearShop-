const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const userModel=require('./model/user.model');
const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://faizankhan:786786@cluster0.5nhsv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
const { request, response } = require('express');
const port = process.env.PORT || 3000;
const app=express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/signup',(request,response)=>{
    console.log(request.body); userModel.create(request.body).then(result=>{
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
})
app.listen(port,()=>{
    console.log('server running');
})