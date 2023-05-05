/*
/api/hospitales
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
    getHospitales,
    crearHospitales,
    updateHospitales,
    deleteHospitales
} = require('../controllers/hospital.controller')

const router = Router();

router.get( '/', getHospitales);

router.post( '/', 
    [
        validarJWT,
        check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ], crearHospitales);


    router.put( '/:id', 
    [], updateHospitales);

    router.delete( '/:id', deleteHospitales);

module.exports = router;