const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const ProductsController = require('../controllers/products');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        // if not window OS use the following line
        // cb(null, new Date().toIOString() + file.originalname)
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a filename
    if (file.mimetype === 'image/jpeg' || 'image/png' ){
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        filesize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


router.get('/', ProductsController.products_get_all );

router.post( "/",  checkAuth, upload.single('productImage'), ProductsController.products_create_product );

router.get('/:productId', ProductsController.products_get_product );

router.patch('/:productId', checkAuth, ProductsController.products_update_product );

router.delete('/:productId', checkAuth, ProductsController.products_delete_product );

module.exports = router;
