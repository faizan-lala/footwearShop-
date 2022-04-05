const express=require('express');
const adminController=require('../controller/admin.controller');

const router=express.Router();
router.post('/signup',adminController.SignUp) 

router.post('/signin', adminController.SignIn)

module.exports=router;
