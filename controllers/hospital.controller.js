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

const updateHospitales = async(req, res = response) => {
    
    const id = req.params.id;
    const uid = req.uid;

    try {

        const hospitalDB = await Hospital.findById( id );

        if( !hospitalDB ){
            return res.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado en DB'
            });
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }
        

        const HospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true});

        res.json({
        ok: true,
        hospital: HospitalActualizado
    })
        
    } catch (error) {
        //console.log(error);
        res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador'
    })
        
    }
}

const deleteHospitales = async(req, res = response) => {

    const id = req.params.id;

    try {

        const hospitalDB = await Hospital.findById( id );

        if( !hospitalDB ){
            return res.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado en DB'
            });
        }

        await Hospital.findByIdAndDelete(id);

        res.json({
        ok: true,
        msg: 'Hospital eliminado'
    });
        
    } catch (error) {
        res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador'
    })
        
    }
}

module.exports = {
    getHospitales,
    crearHospitales,
    updateHospitales,
    deleteHospitales
}