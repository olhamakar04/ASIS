// import mysql from 'mysql'
const mysql = require('mysql');
// Створюємо нове з'єдання на локальному хості
// з вкзаними параметрами
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kadri'
});
// З'єднуємося з БД
// Якщо вдало - виводимо, що з'єднання відбулося
// Якщо ні виводимо помилку
connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected");
    } else {
        console.log("Error while connecting with database");
    }
});

// Експорт з'єднання
module.exports = connection;
