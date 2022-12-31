const {Router} = require('express');
const {check} = require('express-validator');

const {validarCampos}= require('../middlewares/index');

const {
    productosGet,
    productosPost,
    productosPut,
    productosDelete
} = require('../controllers/productos.controller');

const router = Router();

router.get('/',productosGet);
router.post('/',[
    check('nombre','El campo es obligatorio').not().isEmpty(),
    check('descripcion','El campo es obligatorio').not().isEmpty(),
    check('richDescripcion','El campo es obligatorio').not().isEmpty(),
    check('image','El campo es obligatorio').not().isEmpty(),
    check('brand','El campo es obligatorio').not().isEmpty(),
    check('price','El campo es obligatorio').not().isEmpty(),
    check('category','El campo es obligatorio ó categoria invalida').not().isEmpty().isMongoId(),
    check('stock','El campo es obligatorio').not().isEmpty(),
    check('rating','El campo es obligatorio').not().isEmpty(),
    check('numReviews','El campo es obligatorio').not().isEmpty(),
    check('isFeatured','El campo es obligatorio').not().isEmpty(),
    validarCampos
],productosPost);
router.put('/:id',[
    check('id','No es un Id válido').isMongoId(),
    //check('id').custom(existeUserId),
    //check('rol').custom(esRoleValido),
    validarCampos
],productosPut);
router.delete('/:id',[
    //validarJWT,
    //esAdminRol,//SOLO PARA ADMIN
    //tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE'),//FLEXIBLE
    check('id','No es un Id válido').isMongoId(),
    //check('id').custom(existeUserId),
    validarCampos
],productosDelete);


module.exports = router;