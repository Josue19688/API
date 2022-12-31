process.env.NTBA_FIX_319 = 1;
process.env.NTBA_FIX_350=1;
const TelegramBot = require("node-telegram-bot-api");
const Moment = require('moment');
const https = require("https");
const download = require("download");
const path = require('path');
const {v4:uuidv4} = require('uuid');

const {excel} = require('../helpers/generateExcel');
const {generarPdf} = require('../helpers/generatePdf');
const CorreoCliente = require('../models/CorreoClientes.models');


const botReporte = async () => {

  
  const bot = new TelegramBot(token, { polling: true });

  bot.onText(/^\/start/, function(msg){
    var chatId = msg.chat.id;
    var nameUser = msg.from.first_name;
    var alias = msg.from.username;
    
    
    bot.sendMessage(chatId, "<b>Bienvenido</b> : \n<b>" + nameUser+"</b>\n <b>"+alias+"</b>\n <b>COMANDOS :</b>\n  /finalizadas \n /solicitudes ",{parse_mode : "HTML"});
  });

  // bot.on('polling_error', function(error){
  //     console.log(error);
  // });

  bot.onText(/^\/gh/,async(msg)=>{
    //console.log(msg);
    var chatId=msg.chat.id;
    var fecha = msg.date;
    var fee = Moment.unix(fecha).format('DD-MM-YYYY');//fecha actual cuando se solicita
    var anio = Moment.unix(fecha).format('YYYY');
    if(msg.text==='/gh'){
        
      f=`Generar Reportes`;

            var botones = {
                reply_markup:{
                    inline_keyboard:[
                        [
                            {text:"Generar Excel",callback_data:'boton1'},
                            {text:"Generar PDF",callback_data:'boton2'}
                        ]
                    ]
                }
            };

            bot.sendMessage(chatId,f,botones);
   
            bot.on('callback_query',async function onCallbackQuery(accionboton){
                const data = accionboton.data;
               
                
                if(data=='boton1'){

               
                    const correoCliente= await CorreoCliente.find();
                    

                    //TODO:VAMOS A FORMATEAR PRIMERO LA DATA PARA LUEGO GENERAR EL ARCHIVO EXCEL
                    const reg = [];
                    correoCliente.forEach((item)=>{
                        let user={
                          nombre:item.nombre,
                          telefono:item.telefono,
                          correo:item.correo,
                          asunto:item.asunto,
                          mensaje:item.mensaje
                        }
                        reg.push(user);       
                    });
                    
                    const libro = excel(reg);

                    const nombreTemporal=uuidv4()+'.'+'xlsx';
                    
                    const nombreArchivo=nombreTemporal;
                    await libro.xlsx.writeFile(`./uploads/reportes/${accionboton.from.id}.xlsx`);
                  
                   
                    // bot.answerCallbackQuery(accionboton.id, {text: 'Reporte generado exitosamente!!', show_alert: true});  
                    
                    
                    
                    bot.sendDocument(chatId,`./uploads/reportes/${accionboton.from.id}.xlsx`);
                    
                } 

                if(data=='boton2'){

                  const usuarioGenera=accionboton.from.first_name;

                  const rutaImg ='http://localhost:3000/assets/no-image.webp';
                  //../assets/no-image.webp http://localhost:3000/images/logo.svg

                  const contenido = `
                   
                  <!DOCTYPE html>
                  <html lang="es">
                  <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
                    <meta name="viewport" content="width=device-width, initial-sacle=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie-edge">
                  </head>
                  <body>
                    <div style=" margin-left: 3%; margin-right: 3%;">
                      <table  width="100%"> 
                          <tr>
                          <td align="center"  width="5%">
                          <img src="data:image/jpg;base64, {{rutaImg}}">
                          </td>
                          <td style="font-size: 20px; text-align: center; background:#C3CBD5;border-radius: 10px; padding: 15px;" width="50%">
                          HEALTH ENTERPRISE GROUP<br>
                              <u>Unidos para alcanzar tu bienestar.</u><br>
                              <u>Guatemala C.A.</u>
                             
           
                              </td>
                              </tr>
                          </table>
                          <p align="center">REPORTE DE FECHA ${fee} </p><br>


                          <center><label>Documento creado por:${usuarioGenera}</label></center>
                          <br>
                          <table style="margin: 4px;" width="100%" >
                              <tr>
                                <td style=" font-size: 11px;" width="20%">
                                  © ${anio} Health Enterprise Group-HG Fecha creación: ${fee}
                                </td>
                              </tr>
                            </table>

                          </body>
                          </html>

                    `;
                  const ruta = `./uploads/reportes/${accionboton.from.id}.pdf`;

                  generarPdf(ruta,contenido);
                  
                  bot.answerCallbackQuery(accionboton.id, {text: 'Su reporte se esta generando!!', show_alert: true});  
                    
                    
                  
                  setTimeout(()=>{
                    bot.sendDocument(chatId,ruta)
                  },4000);
                 ;

                }

            })

    }
    
   
    
  
 });


  /**
   * Vamos a revisar si es reenviado el mensaje de otro grpo para los post que se mostraran
   * el pa pagina haremos la insercion de esos datos 
   * verificar si es  el el usuario o es reenviado el msg
   */
  
  //TODO: DESCOMENTAR DESPUES DE PRUEBAS
  // bot.on("message", async (msg) => {

  //   let reenviadoTitulo='';
  //   let reenviadoUsername='';
  //   let post='';

  //   const copi = "2027940527";
    
  //   //TODO: DATOS DEL DUEÑO DE LA CUENTA TODO LO QUE VENGA DE FROM 
  //   const myId = msg.from.id;
  //   const nombre = msg.from.first_name;
  //   const username = msg.from.username;

  //   //TODO: DATOS SI EL MENSAJE ES REENVIADO DE OTRO GRUPO
  //   if(msg.forward_from_chat){
  //       reenviadoTitulo =  msg.forward_from_chat.title;
  //       reenviadoUsername=msg.forward_from_chat.username;
  //   }
   
  //   //TODO: DATOS GENERALES DEL CHAT QUE SIEMPRE VENDRAN 
  //   const texto = msg.text;

    

  //   if(msg.photo) {
  //       let caption=msg.caption;
  //       let foto = msg.photo[1].file_id;
  //       const url = `https://api.telegram.org/bot${token}/getFile?file_id=${foto}`;
  //       https.get(url, (res) => {
  //           let data = "";
  //           res.on("data", (chunk) => {
  //               data += chunk;
  //           });
  //           res.on("end", () => {
  //               data = JSON.parse(data);

               
  //               let pathFoto = data.result.file_path;
  //               const urlPath = `https://api.telegram.org/file/bot${token}/${pathFoto}`;
             
  //               /**
  //                * Agregamos la libreria downloads con npm install downloads para hacer la descarga de la imagen de telegram
  //                */
  //               const uploadPath =path.join( __dirname,'../uploads/post',);
  //               //const filePath = `${__dirname}/downloads`;

  //               download(urlPath, uploadPath).then((resp) => {
  //               console.log("Descarga Completa");
  //               });

                
  //               const imagen = pathFoto.slice(7);
  //               //bot.sendPhoto(copi,data.result.file_id);

  //               //TODO: DESCOMENTAR ESTO DESPUES DE LAS PRUEVAS
  //               // post= new BotPost({
  //               //     telegramUser:myId,
  //               //     nombre:nombre,
  //               //     username:username,
  //               //     reenviadoTitulo:reenviadoTitulo,
  //               //     reenviadoUsername:reenviadoUsername,
  //               //     texto:texto,
  //               //     img:imagen,
  //               //     textoImg:caption
    
  //               // });
    
  //               //post.save();
  //           });
            

  //       }).on("error", (err) => {
  //         console.log(err.message);
  //       });
  //   }else{

  //     //TODO: DESCOMENTAR ESTO DESPUES DE LAS PRUEVAS
  //       //  post= new BotPost({
  //       //     telegramUser:myId,
  //       //     nombre:nombre,
  //       //     username:username,
  //       //     reenviadoTitulo:reenviadoTitulo,
  //       //     reenviadoUsername:reenviadoUsername,
  //       //     texto:texto,
            

  //       // });
  //       // await post.save();
  //   }

   
   
  //   bot.sendMessage(copi, `Post agregado correctamente `, {
  //     parse_mode: "HTML",
  //   });

    
  // });



};

module.exports = { botReporte };
