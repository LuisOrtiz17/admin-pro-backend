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

const getMedicoById = async(req, res = response) => {

    const idMed = req.params.id;

    
    
    try {
        const medico = await Medico.findById(idMed)
            .populate('usuario', 'nombre img')
            .populate('hospital', 'nombre');

        res.status(200).json({
            ok: true,
            medico
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

const updateMedico = async(req, res = response) => {

    const uid = req.uid;
    const idMed = req.params.id;

    try {
        const medicoDB = await Medico.findById( idMed );

        if( !medicoDB ){
            return res.status(404).json({
                ok: true,
                msg: 'El medico no existe en BD'
            });
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(idMed, cambiosMedico, { new: true });

        res.status(200).json({
            ok: true,
            medicoActualizado
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }
}

const deleteMedico = async(req, res = response) => {

    const idMed = req.params.id;

    try {
        const medicoDB = await Medico.findById( idMed );

        if( !medicoDB ){
            return res.status(404).json({
                ok: true,
                msg: 'El medico no existe en BD'
            });
        }


        await Medico.findByIdAndDelete(idMed);

        res.status(200).json({
            ok: true,
            msg: 'Medico Eliminado'
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }
}

module.exports = {
    getMedicos,
    crearMedico,
    updateMedico,
    deleteMedico,
    getMedicoById
}