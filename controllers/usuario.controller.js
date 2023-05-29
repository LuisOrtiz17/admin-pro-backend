const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario.model');
const { generarJWT } = require('../helpers/jwt');
const { json } = require('express/lib/response');


const getUsuarios = async (req, res) => {

    const desde = Number(req.query.desde) || 0;

    /*
    const usuarios = await Usuario.find({}, 'nombre email role google')
    .skip(desde)
    .limit(5);

    const total = await Usuario.count();
    */
    const [usuarios, total] = await Promise.all([
        Usuario.find({}, 'nombre email role google img')
            .skip(desde)
            .limit(5),
        Usuario.count()
    ]);

    res.json({
        ok: true,
        usuarios,
        total
    })
}

const crearUsuario = async (req, res = response) => {

    const { nombre, password, email } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
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

        //Genera JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }


}

const actualizarUsuario = async (req, res = response) => {

    // TODO: Validar token y comprobar si el usuario es correcto

    const uid = req.params.id;
    //const {} = req.body;
    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el usuario por ese id'
            });
        }


        // Actualizar el usuario
        const { password, google, email, ...campos } = req.body;

        if (usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({ email });

            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }

        }

        if( !usuarioDB.google ){
            campos.email = email;
        }else if( usuarioDB.email !== email){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario de google no pueden cambiar su correo'
            });
        }

        //al destructurar ya no es necesario el delete porque las excluimos
        /*
        delete campos.password;
        delete campos.google;
        */

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });



        res.json({
            ok: true,
            usuario: usuarioActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const borrarUsuario = async (req, res = response) => {

    const uid = req.params.id;


    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el usuario por ese id'
            });
        }

        const usuarioEliminado = await Usuario.findByIdAndDelete(uid);

        res.status(200).json({
            ok: true,
            usuario: usuarioEliminado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })

    }

}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}