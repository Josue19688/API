require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const fileUpload=require('express-fileupload');


//CONEXIONES A BASE DE DATOS
const {dbConnection} = require('../config/mongo.db');
const db = require('../config/mysql.db');

const {bot} = require('../helpers/bot');

class Server{
    constructor(){
        this.app= express();
        this.port=process.env.PORT||8081;

        this.usuariosPath='/api/usuarios';
        this.authPath='/api/auth';
        this.cargarArchivosPath='/api/uploads';
        this.postPath='/api/post';

        //conexion a mongo db
        this.conectarDB();
        //middlewares
        this.middlewares();
        this.router();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
       
        // db.sync()
        //     .then(()=>console.log('Conectado a la db'))
        //     .catch(error=>console.log(error));
        bot();
        this.app.use(express.json());
        this.app.use(cors({origin:true,credentials:true}));
        this.app.use(express.static('public'));

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true
        }));
    }

    router(){
        this.app.use(this.authPath,require('../routes/auth.routes'));
        this.app.use('/api/usuario',require('../routes/usuario.routes'));
        this.app.use(this.cargarArchivosPath,require('../routes/uploads.routes'));
        this.app.use(this.postPath,require('../routes/post.routes'));
        
    }
    
    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en el puerto : ',this.port);
        })
    }
}


module.exports=Server;