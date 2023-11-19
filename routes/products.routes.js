const express = require('express');
const router = express.Router();

const productController = require('../controllers/products.controller');

router.get('/products', productController.getAll);
router.get('/products/random', productController.getRandom);
router.get('/products/:id', productController.getById);
router.post('/products', productController.addNew);
router.put('/products/:id', productController.edit);
router.delete('/products/:id', productController.delete);

module.exports = router;