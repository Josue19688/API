
const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarios.models');


const validarJWT=async(req, res=response,next)=>{

    const token= req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok:false,
            msg:'No tiene autorización para realizar la tarea'
        })
    }

    try {


        const {uid}= jwt.verify(token, process.env.SECRET_KEY_JWT);
        const usuario = await Usuario.findById(uid);
        if(!usuario){
            return res.status(401).json({
                ok:false,
                msg:'El usuario no existe'
            })
        }

        //TODO: VERIFICAR EL ESTADO DEL USUARIO
        if(!usuario.estado){
            return res.status(401).json({
                ok:false,
                msg:'No tiene autorización para realizar la tarea'
            })
        }

        req.usuario=usuario;
        

        


        next();
    } catch (error) {
        res.status(401).json({
            ok:false,
            msg:'Token invalido!'
        })
    }    

}


module.exports={
    validarJWT
}