/*
/api/medicos
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
    getMedicos,
    crearMedico,
    updateMedico,
    deleteMedico,
    getMedicoById
} = require('../controllers/medico.controller')

const router = Router();

router.get( '/', validarJWT, getMedicos);

router.post( '/', 
    [
        validarJWT,
        check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
        check('hospital', 'El hospital es obligatorio y un ID especifico').isMongoId(),
        validarCampos
    ], crearMedico);


    router.put( '/:id', 
    [
        validarJWT,
        check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
        check('hospital', 'El hospital es obligatorio y un ID especifico').isMongoId(),
        validarCampos
    ], updateMedico);

    router.delete( '/:id', validarJWT, deleteMedico);

    router.get( '/:id', validarJWT, getMedicoById);

module.exports = router;