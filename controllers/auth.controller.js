const { response } = require("express");
const bcryptjs = require('bcryptjs');


const {generarJWT} = require('../helpers/generar-jwt');
const Usuario = require('../models/usuarios.models');



const login=async(req, res=response)=>{

    const {correo, password}= req.body;

    try {

        //TODO: VERIFICAR EL EMAEL
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                ok:false,
                msg:'Usuario o Contraseña no son válidos-email'
            });
        }

        //TODO: VERIFICAR SI EL USUARIO ESTA ACTIVO
        if(!usuario.estado){
            return res.status(400).json({
                ok:false,
                msg:'Usuario o Contraseña no son válidos-status'
            });
        }

        //TODO: VERIFICAR LA CONTRASEÑA
        const validPassword= bcryptjs.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'Usuario o Contraseña no son válidos-pass'
            });
        }

        //TODO: GENERAR EL JWT

        const token = await generarJWT(usuario.id);

        

        res.json({
            ok:true,
            usuario,
            token
        })
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'Algo salio mal'
        })
    }


   
}

const renovarToken = async(req, res=response)=>{

    const {usuario} = req;

    const token = await generarJWT(usuario.id);


    res.json({
        usuario,
        token
    })
}


module.exports ={
    login,
    renovarToken
}