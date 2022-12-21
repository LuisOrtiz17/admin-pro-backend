const express = require('express');

require('dotenv').config();
const { dbConnection } = require('./database/config');
//CORS
const cors = require('cors')


//Crear el servidor de express
const app = express();

//Configurar CORS
app.use(cors());

//Conexión BD Mongo
dbConnection();

//console.log(process.env);

//ZL3MZzJ1CiGw0s13

//Rutas
app.get( '/', (req, res) => {

    res.json({
        ok: true,
        msg: 'Hola Mundo'
    })
});

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto: ' + process.env.PORT);
});