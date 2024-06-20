const express = require('express');
// Створюємо новий маршрутизатор
const router = express.Router();

const userController = require('../controller/user.controller');
// Перегляд всіх користувачів
router.get('/', userController.findAll);
// Створення нового користувача
router.post('/', userController.create);
// Пошук користувача за id
router.get('/:id', userController.findById);
// Редагування користувача за id
router.post('/put/:id', userController.update);
// Видалення користувача за id
router.get('/delete/:id', userController.delete);
// Експортуємо за замовченням router
module.exports = router;
