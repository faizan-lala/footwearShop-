const express=require('express');
const jwt =require('jsonwebtoken');
const token =require('../middleware/token.varification');
const productController=require('../controller/adminproduct.controller');
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

router.post("/add-product",token.verifyToken,upload.single("productImage"),productController.addProduct);
router.get('/product-list',token.verifyToken,productController.productList);
router.delete('/delete-product',token.verifyToken,productController.deleteProduct);
router.post("/update-product",token.verifyToken,upload.single("productImage"),productController.updateProduct);
module.exports=router;