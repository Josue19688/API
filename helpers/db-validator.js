const Usuario = require('../models/usuarios.models');
const Role = require('../models/rol.models');


const esRoleValido= async(rol='')=>{
    const existeRol= await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no es válido.`);
    }
}

const existeEmail=async(correo)=>{
    const existeEmail= await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El  ${correo} ya existe.`);
    }
   
}

const existeUserId=async(id)=>{
    const existeId= await Usuario.findById(id);
    if(!existeId){
        throw new Error(`El  ${id} no  existe.`);
    }
   
}

/**
 * Validar colecciones permitidas 
 */

const coleccionesPermitidas= (coleccion='',colecciones=[])=>{

    const incluida= colecciones.includes(coleccion);
    if(!incluida){
        throw new Error(`La colección ${coleccion} no es permitida`);
    }
    return true;
}

module.exports ={
    esRoleValido,
    existeEmail,
    existeUserId,
    coleccionesPermitidas
}