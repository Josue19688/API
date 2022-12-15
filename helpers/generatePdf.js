

const pdf = require('html-pdf');


const generarPdf=(ruta, contenido)=>{

    pdf.create(contenido).toFile(ruta, function(err, res) {
        if (err){
            console.log(err);
        } else {
        //   bot.sendDocument(chatId,`./uploads/reportes/${accionboton.from.id}.pdf`);
        //     console.log(res);
        return 'Pdf creado correctamente!!';
        }
    });
}

module.exports={
    generarPdf
}