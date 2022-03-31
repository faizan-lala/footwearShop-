const mongoose=require('mongoose');

const imageSchem= new mongoose.Schema({
    imageUrl:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model('image',imageSchem);