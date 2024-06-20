const express = require('express');
// Створюємо новий маршрутизатор
const router = express.Router();

const productController = require('../controller/product.controller');
// Перегляд всіх продуктів
router.get('/', productController.findAll);
// Створення нового продукту
router.post('/', productController.create);
// Пошук продукту за id
router.get('/:id', productController.findById);
// Редагування продукту за id
router.post('/put/:id', productController.update);
// Видалення продукту за id
router.get('/delete/:id', productController.delete);
// Експортуємо за замовченням router
module.exports = router;

