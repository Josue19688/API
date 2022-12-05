
const Sequelize = require('sequelize');



const sequelize = new Sequelize(process.env.NAME_DB,process.env.USER_DB,process.env.PASS_DB,{
    host:process.env.HOST_DB,
    dialect:process.env.DIALEC_DB,
    port:process.env.PORT_DB,
    operatorAliases:false,
    define:{
        timestamps:false
    },
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
});

module.exports = sequelize;

