const express = require('express');
var app = express();
var path = require('path');
app.engine('ejs', require('ejs').__express);
const Product = require('../model/product.model');

// Виведення всієї інформації з таблиці Product
exports.findAll = function (req, res) {
    Product.findAll(function (err, product) {
        console.log('controller');
        if (err)
            res.send(err);
        // З'єднуємо з файлом виведення
        res.render('product.ejs', { Product: product });
        // res.send(product);
    });
};

// Створення нового запису в таблиці Product
exports.create = function (req, res) {
    const new_product = new Product(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required fields' });
    } else {
        Product.create(new_product, function (err, product) {
            if (err)
                res.send(err);
            // Переходимо на сторінку з таблицею продуктів
            res.redirect('/api/product')
        });
    }
};

// Пошук продукту за id
exports.findById = function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err)
            res.send(err);
        // Перехід на сторінку редагування
        res.render('product_edit.ejs', { Product: product });
        // res.json(product);
    });
};

// Редагування інформації про продукт
exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required fields' });
    } else {
        Product.update(req.params.id, new Product(req.body), function (err, product) {
            if (err)
                res.send(err);
            // Повернення на сторінку з таблицею продуктів
            res.redirect('/api/product')
            // res.json({ error: false, message: 'Product successfully updated' });
        });
    }
};

// Видалення продукту
exports.delete = function (req, res) {
    Product.delete(req.params.id, function (err, product) {
        console.log("Deleted Product ID: " + req.params.id);
        if (err)
            res.send(err);
        res.redirect('/api/product')
        // res.json({ error: false, message: 'Product successfully deleted' });
    });
};
