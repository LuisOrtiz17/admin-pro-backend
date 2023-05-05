const { response } = require('express');
const Hospital = require('../models/hospital.model');

const getHospitales = async(req, res = response) => {

    const hospitales = await Hospital.find()
    .populate('usuario', 'nombre img');

    try {
        res.status(200).json({
            ok: true,
            hospitales
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
        
    }
}

const crearHospitales = async(req, res = response) => {

    
    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body});

    try {

        const hospitalDB = await hospital.save();

        res.status(200).json({
            ok: true,
            hospital: hospitalDB
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }

    
}

const updateHospitales = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'updateHospitales'
    })
}

const deleteHospitales = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'deleteHospitales'
    })
}

module.exports = {
    getHospitales,
    crearHospitales,
    updateHospitales,
    deleteHospitales
}