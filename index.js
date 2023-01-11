const express = require('express');

require('dotenv').config();
const { dbConnection } = require('./database/config');
//CORS
const cors = require('cors')


//Crear el servidor de express
const app = express();

//Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

//Conexión BD Mongo
dbConnection();

//console.log(process.env);

//ZL3MZzJ1CiGw0s13

//Rutas
app.use('/api/usuarios', require('./routes/usuarios.route'));
app.use('/api/login', require('./routes/auth.router'));
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