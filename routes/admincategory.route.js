const express=require('express');
const { body } = require('express-validator');
const jwt=require('jsonwebtoken');
const token=require('../middleware/token.varification');
const categoryController=require('../controller/admincategory.controller');
const router=express.Router();


const multer = require("multer");
const { verifyToken } = require('../middleware/token.varification');
var storage = multer.diskStorage(
    {
        destination: 'public/images',
        filename: function (req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname);
        }
    });

var upload = multer({ storage: storage });


router.post('/add-category',token.verifyToken, upload.single('categoryImage'), 
body('categoryName').not().isEmpty(),categoryController.AddCategory);


router.get('/category-list',token.verifyToken,categoryController.CategoryList);


router.delete('/delete-category',token.verifyToken,categoryController.DeleteCategory)


router.post('/update-category',token.verifyToken, upload.single('categoryImage'),categoryController.UpdateCategory)

module.exports=router;

