const express = require('express');
var app = express();
var path = require('path');
app.engine('ejs', require('ejs').__express);
const Category = require('../model/category.model');

// Виведення всієї інформації з таблиці Category
exports.findAll = function (req, res) {
    Category.findAll(function (err, category) {
        console.log('controller');
        if (err)
            res.send(err);
        // З'єднуємо з файлом виведення
        res.render('category.ejs', { Category: category });
        // res.send(category);
    });
};

// Створення нового запису в таблиці Category
exports.create = function (req, res) {
    const new_category = new Category(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required fields' });
    } else {
        Category.create(new_category, function (err, category) {
            if (err)
                res.send(err);
            // Переходимо на сторінку з таблицею категорій
            res.redirect('/api/category')
        });
    }
};

// Пошук категорії за id
exports.findById = function (req, res) {
    Category.findById(req.params.id, function (err, category) {
        if (err)
            res.send(err);
        // Перехід на сторінку редагування
        res.render('category_edit.ejs', { Category: category });
        // res.json(category);
    });
};

// Редагування інформації про категорію
exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required fields' });
    } else {
        Category.update(req.params.id, new Category(req.body), function (err, category) {
            if (err)
                res.send(err);
            // Повернення на сторінку з таблицею категорій
            res.redirect('/api/category')
            // res.json({ error: false, message: 'Category successfully updated' });
        });
    }
};

// Видалення категорії
exports.delete = function (req, res) {
    Category.delete(req.params.id, function (err, category) {
        console.log("Deleted Category ID: " + req.params.id);
        if (err)
            res.send(err);
        res.redirect('/api/category')
        // res.json({ error: false, message: 'Category successfully deleted' });
    });
};
