// Підключення до БД
var connection = require('./../config/config.bd');

// Функція для створення об'єкту Category
var Category = function (category) {
    this.name = category.name;
    this.description = category.description;
};

// Створення нового запису у БД
Category.create = function (newCategory, result) {
    connection.query("INSERT INTO Category SET ?", newCategory, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

// Пошук у таблиці за id
Category.findById = function (id, result) {
    connection.query("SELECT * FROM Category WHERE category_id = ?", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

// Виведення усіх категорій, що є у таблиці
Category.findAll = function (result) {
    connection.query("SELECT * FROM Category", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('Category : ', res);
            result(null, res);
        }
    });
};

// Зміна запису з певним id у БД
Category.update = function (id, category, result) {
    connection.query("UPDATE Category SET name=?, description=? WHERE category_id = ?", 
        [category.name, category.description, id],
        function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        });
};

// Видалення запису з певним id у БД
Category.delete = function (id, result) {
    connection.query("DELETE FROM Category WHERE category_id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

// Вказуємо, що експортуємо з модуля Category
module.exports = Category;
