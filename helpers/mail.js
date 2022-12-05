const nodemailer = require("nodemailer");


//TODO: SIN TERMINAR DE CONFIGURAR LA OPCION
const enviarMail = (req, res) => {
    let sender = nodemailer.createTransport({
        service: process.env.MAIL_SERVICE,
        auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
        },
    });

    let mail = {
        from: "username@gmail.com",
        to: "receiver's_username@gmail.com",
        subject: "Sending Email using Node.js",
        text: "That was easy!",
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
