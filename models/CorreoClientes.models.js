

const {Schema, model} = require('mongoose');


const CorreoClientesSchema=Schema({
    nombre:{
        type:String
    },
    telefono:{
        type:String
    },
    correo:{
        type:String
    },
    asunto:{
        type:String
    },
    mensaje:{
        type:String,
    },
    creado:{
        type:Date
    }
});

/**
 * 
 * @returns un usuario sin la version y password
 */
 CorreoClientesSchema.methods.toJSON=function(){
    const {__v, _id, ...correoCliente}=this.toObject();
    correoCliente.uid=_id;
    return  correoCliente;
}

module.exports =model('CorreoCliente',CorreoClientesSchema);