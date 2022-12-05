const { response } = require("express");
const path = require('path');
const fs = require('fs');
const { subirArchivo } = require("../helpers/subir-archivo");
const Usuario = require('../models/usuarios.models');

const cargarArchivo=async(req, res=response)=>{


    try {



        const pathCompleto = await subirArchivo(req.files,['pdf'],'usuarios');

        res.json({
            path:pathCompleto
        })
        
    } catch (error) {
        res.status(400).json({
            msg:'Error al subir el archivo'
        });
    }

   

   

}

/**
 * NOS SERVIRA PARA VALIDAR Y SUBIR ARCHIVOS DE DIFERENTES MODELOS
 * QUE NECESITEMOS Y ASI EVITAR VOLVER A ESCRIBIR OTRO METODO
 * SOLO DEVEMOS PASARLE LAS COLECCIONES ADMITIDAS
 * 
 * @param {id, coleccion modelos} parametros requeridos 
 * @files {archivo} extenciones adminitdas 
 * @returns modelo
 */


const actualizarImagen=async(req, res=response)=>{

    const{id, coleccion} = req.params;


    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo=await Usuario.findById(id);
            if(!modelo){
                return res.status(400).json({
                    msg:`No existe usuario con el id :  ${id}`
                })
            }
            
            break;
        default:
            return res.status(500).json({
                msg:`Se me olvido olvidar esto`
            })
            break;
    }

    try {

        //TODO: Eliminar imagenes previas

        if(modelo.img){
            const pathImagen=path.join(__dirname,'../uploads',coleccion,modelo.img);
            if(fs.existsSync(pathImagen)){
                fs.unlinkSync(pathImagen);
            }
        }


        const nombre =  await subirArchivo(req.files,undefined,coleccion);
        modelo.img=nombre;

        await modelo.save();

        res.json({
            modelo
        })
    } catch (error) {
        return res.status(400).json({
            msg:'No se pudo subir el archivo'
        });
    }    
    
   
}







module.exports={
    cargarArchivo,
    actualizarImagen
}