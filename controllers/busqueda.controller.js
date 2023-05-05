const { response } = require("express");
const Usuario = require('../models/usuario.model');
const Medico = require('../models/medico.model');
const Hospital = require('../models/hospital.model');

const getBusqueda = async(req, res = response) =>{

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i' );

    /*
    const usuarios = await Usuario.find({nombre: regex});
    const hospitales = await Hospital.find({nombre: regex});
    const medicos = await Medico.find({nombre: regex});
    */

    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({nombre: regex}),
        Hospital.find({nombre: regex}),
        Medico.find({nombre: regex})
    ]);

    try {

        res.status(200).json({
            ok: true,
            usuarios,
            hospitales,
            medicos
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
        
    }
}

const getDocumentosColeccion = async(req, res = response) =>{

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i' );

    let data = [];

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({nombre: regex})
            .populate('usuario', 'nombre img')
            .populate('hospital', 'nombre img');
            
            break;
        case 'usuarios':
            data = await Usuario.find({nombre: regex});
            
            break;
        case 'hospitales':
            data = await Hospital.find({nombre: regex})
            .populate('usuario', 'nombre img');
            break;
    
        default:
           return res.status(400).json({
                ok: false,
                msg: 'la tabla tiene que ser usuarios/medicos/hospitales'
            });
           
    }
    res.status(200).json({
        ok: true, 
        resultados: data
    })

}



module.exports = {
    getBusqueda,
    getDocumentosColeccion
}