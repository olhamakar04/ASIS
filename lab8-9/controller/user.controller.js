const express = require('express');
var app = express();
var path = require('path');
app.engine('ejs', require('ejs').__express);
const User = require('../model/user.model');

// Виведення всієї інформації з таблиці User
exports.findAll = function (req, res) {
    User.findAll(function (err, user) {
        console.log('controller');
        if (err)
            res.send(err);
        // З'єднуємо з файлом виведення
        res.render('user.ejs', { User: user });
        // res.send(user);
    });
};

// Створення нового запису в таблиці User
exports.create = function (req, res) {
    const new_user = new User(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required fields' });
    } else {
        User.create(new_user, function (err, user) {
            if (err)
                res.send(err);
            // Переходимо на сторінку з таблицею користувачів
            res.redirect('/api/user')
        });
    }
};

// Пошук користувача за id
exports.findById = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err)
            res.send(err);
        // Перехід на сторінку редагування
        res.render('user_edit.ejs', { User: user });
        // res.json(user);
    });
};

// Редагування інформації про користувача
exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required fields' });
    } else {
        User.update(req.params.id, new User(req.body), function (err, user) {
            if (err)
                res.send(err);
            // Повернення на сторінку з таблицею користувачів
            res.redirect('/api/user')
            // res.json({ error: false, message: 'User successfully updated' });
        });
    }
};

// Видалення користувача
exports.delete = function (req, res) {
    User.delete(req.params.id, function (err, user) {
        console.log("Deleted User ID: " + req.params.id);
        if (err)
            res.send(err);
        res.redirect('/api/user')
        // res.json({ error: false, message: 'User successfully deleted' });
    });
};
