const express = require('express');
const path = require('path');
const userRouter = require('./routes/user.routes');

const PORT = /* process.env.PORT || */ 5000;   //Инициализация сервера
const app = express(); //Подключение экспресс-a

app.use(express.json());  //Преобразование данных в JSON
app.use('/api', userRouter);

/* app.use(express.static(path.resolve(__dirname.at, 'client'))); */
  
/* app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
});
 */
app.listen(PORT, () => console.log(`Server started on port ${PORT}...`)); //Запуск сервера

