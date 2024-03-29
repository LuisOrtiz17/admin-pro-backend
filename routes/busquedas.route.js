/*
ruta api/todo/:busqueda
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getBusqueda, getDocumentosColeccion } = require('../controllers/busqueda.controller');


const router = Router();

router.get('/:busqueda', [validarJWT], getBusqueda);
router.get('/coleccion/:tabla/:busqueda', [validarJWT], getDocumentosColeccion);

module.exports = router;