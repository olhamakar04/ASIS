// Підключаємо express
const express = require('express');
// Підключаємо bodyParser
const bodyParser = require('body-parser');
// Встановлюємо порт
const PORT = 5000;
const app = express();
// парсити запити типу content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// парсити запити типу content-type - application/json
app.use(bodyParser.json())
//!Щоб на сервері бачити усі рішення 
app.use(express.static("."));
// Обробка get запиту - endpoint
// Вхід
// Адреса за якою він буде працювати
// Функція, що буде виконуватися по запиту на цій endpoint
// Параметри функції
// req - запит
// res - відповідь
app.get('/', (req, res) => {
    // Вказуємо 200 - успішний статус
    // json - тіло відповіді - повідомлення
    // res.status(200).json("Сервер працює");
    //! Запуск головної сторінки
    res.render('index.ejs');
})
// Require departament routes
const departamentRoutes = require('./router/departament.routes')
app.use('/api/departament', departamentRoutes);
// Require position routes
const positionRoutes = require('./router/position.routes ')
app.use('/api/position', positionRoutes);

// створюємо екземпляр застосунку
//вхід
//порт
//callback функція, яка відпрацює лише у випадку успішного запуску серверу
app.listen(PORT, () => console.log("SERVER START!!!"))
