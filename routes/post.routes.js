

const {Router} = require('express');
const {check} = require('express-validator');

const { postGet, enviarCorreo } = require('../controllers/post.controller');

const {validarCampos}= require('../middlewares/index');

const router = Router();


router.get('/',postGet);
router.post('/correo',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('correo','El correo no es válido').isEmail(),
    check('asunto','El asunto es obligatorio').not().isEmpty(),
    check('mensaje','El mensaje es obligatorio').not().isEmpty(),
    validarCampos
],enviarCorreo);


module.exports = router;