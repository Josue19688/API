const nodemailer = require("nodemailer");


//TODO: SIN TERMINAR DE CONFIGURAR LA OPCION
const enviarMail = (correo,asunto,texto) => {
    let sender = nodemailer.createTransport({
        service: process.env.MAIL_SERVICE,
        auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
        },
    });

    let mail = {
        from: "sistema@gmail.com",
        to: correo,
        subject: asunto,
        html: texto,
    };

    sender.sendMail(mail, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent successfully: " + info.response);
        }
    });
};

module.exports = {
  enviarMail,
};
