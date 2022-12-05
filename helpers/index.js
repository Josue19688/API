

const dbValidator=require('./db-validator');
const generarJWT=require('./generar-jwt');
const correo=require('./mail');
const subirArchivo=require('./subir-archivo');


module.exports={
    ...dbValidator,
    ...generarJWT,
    ...correo,
    ...subirArchivo
}
