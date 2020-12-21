var express = require('express');
var router = express.Router();

const indexController = require('../controllers/indexController');
const productController = require('../controllers/productController');

router.get('/', productController.showIndex);

router.get('/login', indexController.login);
router.post('/login', indexController.postLogin);

router.get('/register', indexController.register);
router.post('/register', indexController.postRegister);


module.exports = router;
