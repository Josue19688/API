

const {Schema, model} = require('mongoose');


const BotSchema=Schema({
    telegramUser:{
        type:String
    },
    nombre:{
        type:String
    },
    username:{
        type:String
    },
    reenviadoTitulo:{
        type:String
    },
    reenviadoUsername:{
        type:String,
    },
    texto:{
        type:String
    },
    img:{
        type:String
    },
    textoImg:{
        type:String
    }
});

/**
 * 
 * @returns un usuario sin la version y password
 */
BotSchema.methods.toJSON=function(){
    const {__v, _id, ...bot}=this.toObject();
    bot.uid=_id;
    return bot;
}

module.exports =model('BotPost',BotSchema);