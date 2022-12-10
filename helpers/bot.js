process.env.NTBA_FIX_319 = 1;
const TelegramBot = require("node-telegram-bot-api");
const https = require("https");
const download = require("download");
const path = require('path');

const BotPost = require('../models/bot.models');


const bot = async () => {
  
  const token = '5351040426:AAFGM1YN-SfAuQcgBMsz_tdrA-6p8OYQUuI';
  //const token = "2145537077:AAGudtb06BBzj5-L6aSCqwCU0FazL4bOGX0";
  const bot = new TelegramBot(token, { polling: true });

  /**
   * Vamos a revisar si es reenviado el mensaje de otro grpo para los post que se mostraran
   * el pa pagina haremos la insercion de esos datos 
   * verificar si es  el el usuario o es reenviado el msg
   */
  
  bot.on("message", async (msg) => {

    let reenviadoTitulo='';
    let reenviadoUsername='';
    let post='';

    const copi = "2027940527";
    
    //TODO: DATOS DEL DUEÑO DE LA CUENTA TODO LO QUE VENGA DE FROM 
    const myId = msg.from.id;
    const nombre = msg.from.first_name;
    const username = msg.from.username;

    //TODO: DATOS SI EL MENSAJE ES REENVIADO DE OTRO GRUPO
    if(msg.forward_from_chat){
        reenviadoTitulo =  msg.forward_from_chat.title;
        reenviadoUsername=msg.forward_from_chat.username;
    }
   
    //TODO: DATOS GENERALES DEL CHAT QUE SIEMPRE VENDRAN 
    const texto = msg.text;

    

    if(msg.photo) {
        let caption=msg.caption;
        let foto = msg.photo[1].file_id;
        const url = `https://api.telegram.org/bot${token}/getFile?file_id=${foto}`;
        https.get(url, (res) => {
            let data = "";
            res.on("data", (chunk) => {
                data += chunk;
            });
            res.on("end", () => {
                data = JSON.parse(data);

               
                let pathFoto = data.result.file_path;
                const urlPath = `https://api.telegram.org/file/bot${token}/${pathFoto}`;
             
                /**
                 * Agregamos la libreria downloads con npm install downloads para hacer la descarga de la imagen de telegram
                 */
                const uploadPath =path.join( __dirname,'../uploads/post',);
                //const filePath = `${__dirname}/downloads`;

                download(urlPath, uploadPath).then((resp) => {
                console.log("Descarga Completa");
                });

                
                const imagen = pathFoto.slice(7);
                //bot.sendPhoto(copi,data.result.file_id);


                post= new BotPost({
                    telegramUser:myId,
                    nombre:nombre,
                    username:username,
                    reenviadoTitulo:reenviadoTitulo,
                    reenviadoUsername:reenviadoUsername,
                    texto:texto,
                    img:imagen,
                    textoImg:caption
    
                });
    
                post.save();
            });
            

        }).on("error", (err) => {
          console.log(err.message);
        });
    }else{
         post= new BotPost({
            telegramUser:myId,
            nombre:nombre,
            username:username,
            reenviadoTitulo:reenviadoTitulo,
            reenviadoUsername:reenviadoUsername,
            texto:texto,
            

        });
        await post.save();
    }

   
   
    bot.sendMessage(copi, `Post agregado correctamente `, {
      parse_mode: "HTML",
    });

    
  });
};

module.exports = { bot };
