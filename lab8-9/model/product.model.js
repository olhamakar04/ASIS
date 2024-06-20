// Підключення до БД
var connection = require('./../config/config.bd');

// Функція для створення об'єкту Product
var Product = function (product) {
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.stock_quantity = product.stock_quantity;
    this.category_id = product.category_id;
};

// Створення нового запису у БД
Product.create = function (newProduct, result) {
    connection.query("INSERT INTO Product SET ?", newProduct, function (err, res) {
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
Product.findById = function (id, result) {
    connection.query("SELECT * FROM Product WHERE product_id = ?", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

// Виведення усіх продуктів, що є у таблиці
Product.findAll = function (result) {
    connection.query("SELECT * FROM Product", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('Product : ', res);
            result(null, res);
        }
    });
};

// Зміна запису з певним id у БД
Product.update = function (id, product, result) {
    connection.query("UPDATE Product SET name=?, description=?, price=?, stock_quantity=?, category_id=? WHERE product_id = ?", 
        [product.name, product.description, product.price, product.stock_quantity, product.category_id, id],
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
Product.delete = function (id, result) {
    connection.query("DELETE FROM Product WHERE product_id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

// Вказуємо, що експортуємо з модуля Product
module.exports = Product;
