var express = require('express');
var router = express.Router();

const productController = require('../controllers/productController');

router.get('/detail/:id/', productController.productDetail);

//Pagina de inicio, listado de productos
router.get('/', productController.index); 

//Recepción del formulario de carga
router.get('/create', productController.create); //para ver el formulario
router.post('/create', productController.store); //procesa los datos ingresados 


//Formulario de edición de Productos
router.get('/edit/:id', productController.edit); 
router.post('/edit/:id', productController.update); 


//Eliminación de productos
router.get('/delete/:id', productController.destroy); 


module.exports = router;