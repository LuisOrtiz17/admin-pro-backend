const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario.model');


const getUsuarios = async (req, res) => {

    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok: true,
        usuarios
    })
}

const crearUsuario = async (req, res = response) => {

    const { nombre, password, email } = req.body;

    try {

        const existeEmail = await Usuario.findOne({email});

        if( existeEmail ){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        const usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //Guardar en BD
        await usuario.save();

        res.json({
            ok: true,
            usuario
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }


}

module.exports = {
    getUsuarios,
    crearUsuario
}