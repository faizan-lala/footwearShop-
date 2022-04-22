
const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const categorySchema=new mongoose.Schema({
   categoryName:{
       type:String,
   },
   categoryImage:{
    type:String,
    
   }
});

module.exports=mongoose.model('category',categorySchema);