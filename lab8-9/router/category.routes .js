const express = require('express');
// Створюємо новий маршрутизатор
const router = express.Router();

const categoryController = require('../controller/category.controller');
// Перегляд всіх категорій
router.get('/', categoryController.findAll);
// Створення нової категорії
router.post('/', categoryController.create);
// Пошук категорії за id
router.get('/:id', categoryController.findById);
// Редагування категорії за id
router.post('/put/:id', categoryController.update);
// Видалення категорії за id
router.get('/delete/:id', categoryController.delete);
// Експортуємо за замовченням router
module.exports = router;

