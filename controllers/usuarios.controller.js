const {response}=require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuarios.models');


const usuariosGet=async(req, res)=>{

    const {limite=5,desde=0}= req.query;

    
    /**
     * Para cuando tengamos varias consultas realizaremos una 
     * promesa para que el codigo no sea bloqueante
     */
    const [total, usuarios] =await Promise.all([
        Usuario.countDocuments({estado:true}),
        Usuario.find({estado:true})
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        ok:true,
        total,
        usuarios
        
    });
}

const usuariosPost = async(req, res=response)=>{

    const {nombre, correo, password,rol}=req.body;
    const usuario = new Usuario({nombre,correo,password,rol});
   
    const salt=bcryptjs.genSaltSync(10);
    usuario.password=bcryptjs.hashSync(password,salt);

   //TODO: PODEMOS ENVIAR UN CORREO AL USUARIO DONDE SE LE DE LA CONTRASEÑA
   
    
    await usuario.save();
    res.json({
        ok:true,
        usuario
    })
}

const usuariosPut=async(req, res=response)=>{
    const {id} = req.params;
    const {_id, password, google, ...resto} =  req.body;

    //TODO:validar contra la base de datos
    if(password){
        const salt = bcryptjs.genSaltSync(10);
        resto.password=bcryptjs.hashSync(password,salt);
    }

    const usuario= await Usuario.findByIdAndUpdate(id,resto);
    usuario.save();

    res.json({
        ok:true,
        usuario
    })
}

const usuariosDelete=async(req,res=response)=>{

    const {id} = req.params;


    const usuario= await Usuario.findByIdAndUpdate(id,{estado:false});

    res.json({
        ok:true,
        usuario
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}