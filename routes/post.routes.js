

const {Router} = require('express');
const { postGet } = require('../controllers/post.controller');



const router = Router();


router.get('/',postGet);


module.exports = router;