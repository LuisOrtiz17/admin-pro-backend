const express = require('express');

require('dotenv').config();

const path = require('path');
const { dbConnection } = require('./database/config');
//CORS
const cors = require('cors')


//Crear el servidor de express
const app = express();

//Configurar CORS
app.use(cors());

//Carpeta publica
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json());

//Conexión BD Mongo
dbConnection();

//console.log(process.env);

//ZL3MZzJ1CiGw0s13

//Rutas
app.use('/api/usuarios', require('./routes/usuarios.route'));
app.use('/api/login', require('./routes/auth.router'));
app.use('/api/hospitales', require('./routes/hospitales.route'));
app.use('/api/medicos', require('./routes/medicos.route'));
app.use('/api/todo', require('./routes/busquedas.route'));
app.use('/api/upload', require('./routes/upload.route'));

//Lo último
app.get('*', ( req, res) => {
    res.sendFile( path.resolve( __dirname, 'public/index.html' ));
});
/*
app.get( '/api/usuarios', (req, res) => {

    res.json({
        ok: true,
        usuarios: [{
            id:258,
            nombre: 'Luis'
        }]
    })
});
*/

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto: ' + process.env.PORT);
});