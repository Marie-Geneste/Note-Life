const express = require ('express');
const dotenv = require('dotenv').config({path: '.env'});
const mongoConnect = require('./connect');
const routes = require('./router/router');


const app = express();
mongoConnect()

// Body parsing middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Token parsing : req.token en global si jamais il y a
app.use(userMiddleware.decodeToken);

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Le serveur est sur : http://localhost:${PORT}`);
})