const express=require('express');
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

router.post("/add-product",upload.single("productImage"),productController.addProduct);
router.get('/product-list',productController.productList);
router.delete('/delete-product',productController.deleteProduct);
router.post("/update-product",upload.single("productImage"),productController.updateProduct);
module.exports=router;