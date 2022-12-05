const { response } = require("express")


const esAdminRol=(req, res=response,next)=>{


    if(!req.usuario){
        return res.status(500).json({
            ok:false,
            msg:'El rol no es válido'
        })
    }

    const {rol, nombre} = req.usuario;

    if(rol!=='ADMIN_ROLE'){
        return res.status(401).json({
            ok:false,
            msg:`${nombre}, No tiene autorización para realizar la acción`
        })
    }

    next();
}

const tieneRol=(...roles)=>{

    return (req, res=response,next)=>{

        if(!req.usuario){
            return res.status(500).json({
                ok:false,
                msg:'El rol no es válido'
            })
        }

        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                ok:false,
                msg:'El rol no tiene permisos para realizar acciones'
            })
        }

        next();
    }
}

module.exports={
    esAdminRol,
    tieneRol
}