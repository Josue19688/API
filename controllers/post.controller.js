


const {response}=require('express');

const BotPost = require('../models/bot.models');


const postGet=async(req, res=response)=>{


    //TODO: ORDENAMOS LA CONSULTA TRAYENDONOS EL ULTIMO INSERTADO COMO PRIMERO
    const post = await BotPost.find().sort({$natural:-1}).limit(5);
        
    res.json({
        ok:true,
        post
        
    });
}

module.exports = {
    postGet
    
}