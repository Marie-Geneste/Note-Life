const express = require ('express');
const dotenv = require('dotenv').config({path: '.env'});
const mongoConnect = require('./connect');
const router = require('./router/router');
const userMiddleware = require('./middleware/userMiddleware');
const cors = require("cors");


const app = express();
mongoConnect()

// On autorise les requêtes Cross-Origin, qui par défaut seraient bloquées.
app.use(cors({
    origin: "http://localhost:4200",
}));

// Body parsing middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Token parsing : req.token en global si jamais il y a
app.use(userMiddleware.decodeToken);

// Router
app.use(router);

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Le serveur est sur : http://localhost:${PORT}`);
})