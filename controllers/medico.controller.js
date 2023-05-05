const { response } = require('express');
const Medico = require('../models/medico.model');

const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre');
    

    try {
        res.status(200).json({
            ok: true,
            medicos
        })
        
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        });
    }

    
}

const crearMedico = async(req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {
        const medicoDB = await medico.save();

        res.status(200).json({
            ok: true,
            medico: medicoDB
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }


    
}

const updateMedico = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'updateMedico'
    })
}

const deleteMedico = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'deleteMedico'
    })
}

module.exports = {
    getMedicos,
    crearMedico,
    updateMedico,
    deleteMedico
}