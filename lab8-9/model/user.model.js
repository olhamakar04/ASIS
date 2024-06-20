// Підключення до БД
var connection = require('./../config/config.bd');

// Функція для створення об'єкту User
var User = function (user) {
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.role = user.role;
};

// Створення нового запису у БД
User.create = function (newUser, result) {
    connection.query("INSERT INTO User SET ?", newUser, function (err, res) {
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
User.findById = function (id, result) {
    connection.query("SELECT * FROM User WHERE user_id = ?", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

// Виведення усіх користувачів, що є у таблиці
User.findAll = function (result) {
    connection.query("SELECT * FROM User", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            console.log('User : ', res);
            result(null, res);
        }
    });
};

// Зміна запису з певним id у БД
User.update = function (id, user, result) {
    connection.query("UPDATE User SET name=?, email=?, password=?, role=? WHERE user_id = ?", 
        [user.name, user.email, user.password, user.role, id],
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
User.delete = function (id, result) {
    connection.query("DELETE FROM User WHERE user_id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

// Вказуємо, що експортуємо з модуля User
module.exports = User;
