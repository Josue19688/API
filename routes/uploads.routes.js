const {Router} = require('express');
const {check} = require('express-validator');
const { cargarArchivo, actualizarImagen } = require('../controllers/uploads.controller');
const { coleccionesPermitidas } = require('../helpers/db-validator');
const { validarCampos, validarArchivo } = require('../middlewares');



const router = Router();

router.post('/',validarArchivo,cargarArchivo);



/**
 * ESTA RUTA NOS SERVIRA PARA ACTUALIZAR IMAGEN DE CUALQUIER MODELO
 * DATOS REQUERIDOS   api/uploads/usuarios/638bfc2064ddabf6f1218910
 * @Params {id =>modelo}
 * @Params {coleccion=>modele} usuarios, roles, registros etc.
 */

router.put('/:coleccion/:id',[
    validarArchivo,
    check('id','El id no existe').isMongoId(),
    check('coleccion').custom(c=>coleccionesPermitidas(c,['usuarios'])),
    validarCampos
],actualizarImagen);




module.exports = router;