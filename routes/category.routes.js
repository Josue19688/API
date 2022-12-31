const {Router} = require('express');
const {check} = require('express-validator');

const {validarCampos,validarJWT}= require('../middlewares/index');

const {
    categorysGet,
    categorysPost,
    categorysPut,
    categorysDelete
} = require('../controllers/category.controller');


const router = Router();

router.get('/',categorysGet);
router.post('/',[
    check('nombre','El campo es obligatorio').not().isEmpty(),
    check('icono','El campo es obligatorio').not().isEmpty(),
    check('color','El campo es obligatorio').not().isEmpty(),
    validarCampos
],categorysPost);
router.put('/:id',[
    check('id','No es un Id válido').isMongoId(),
    validarCampos
],categorysPut);
router.delete('/:id',[
    //validarJWT,
    //esAdminRol,//SOLO PARA ADMIN
    check('id','No es un Id válido').isMongoId(),
    validarCampos
],categorysDelete);


module.exports = router;