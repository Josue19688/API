const { response } = require("express")



const validarArchivo = (req, res=response, next)=>{

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo || Object.keys(req.files.archivo).length === 0) {
        res.status(400).json({
            msg:'No hay archivos.'
        });
        
    }

    next();

}



module.exports={
    validarArchivo
}