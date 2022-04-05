const express=require('express');
const { body } = require('express-validator');
const categoryController=require('../controller/admincategory.controller');
const router=express.Router();

const multer = require("multer");
var storage = multer.diskStorage(
    {
        destination: 'public/images',
        filename: function (req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname);
        }
    });

var upload = multer({ storage: storage });


router.post('/add-category', upload.single('categoryImage'), 
body('categoryName').not().isEmpty(),categoryController.AddCategory);


router.get('/category-list',categoryController.CategoryList);


router.delete('/delete-category',categoryController.DeleteCategory)


router.post('/update-category', upload.single('categoryImage'),categoryController.UpdateCategory)

module.exports=router;

