const {Router} = require('express');
const {check} = require('express-validator');

const {validarCampos,validarJWT,esAdminRol, tieneRol}= require('../middlewares/index');
const { esRoleValido, existeEmail, existeUserId } = require('../helpers/db-validator');

const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios.controller');



const router = Router();

router.get('/',usuariosGet);
router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('correo','El correo no es válido').isEmail(),
    check('correo').custom(existeEmail),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    check('rol').custom(esRoleValido),
    validarCampos
],usuariosPost);
router.put('/:id',[
    check('id','No es un Id válido').isMongoId(),
    check('id').custom(existeUserId),
    check('rol').custom(esRoleValido),
    validarCampos
],usuariosPut);
router.delete('/:id',[
    validarJWT,
    //esAdminRol,//SOLO PARA ADMIN
    tieneRol('ADMIN_ROLE','USER_ROLE','AGENTE_ROLE'),//FLEXIBLE
    check('id','No es un Id válido').isMongoId(),
    check('id').custom(existeUserId),
    validarCampos
],usuariosDelete);


module.exports = router;