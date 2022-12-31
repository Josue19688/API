


const {Schema, model, default: mongoose} = require('mongoose');


const CategorySchema=Schema({
    name:{
        type:String,
        required:[true,'El nombre el obligatorio']
    },
    icon:{
        type:String,
        required:[true,'La descripcion es  obligatorio']
    },
    color:{
        type:String,
        default:''
    }
});

/**
 * 
 * @returns un usuario sin la version y password
 */
CategorySchema.methods.toJSON=function(){
    const {__v,_id, ...category}=this.toObject();
    category.uid=_id;
    return category;
}

module.exports =model('Category',CategorySchema);