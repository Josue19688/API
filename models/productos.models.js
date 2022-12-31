

const {Schema, model, default: mongoose} = require('mongoose');


const ProductosSchema=Schema({
    name:{
        type:String,
        required:[true,'El nombre el obligatorio']
    },
    descripcion:{
        type:String,
        required:[true,'La descripcion es  obligatorio']
    },
    richDescripcion:{
        type:String,
        default:''
    },
    imagen:{
        type:String,
        default:''
    },
    images:[{
        type:String
    }],
    brand:{
        type:String,
        default:''
    },
    price:{
        type:String,
        default:0
    },
    category:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:'Category',
        required:true
    },
    countInStock:{
        type:Number,
        required:true,
        min:0,
        max:255
    },
    rating:{
        type:Number,
        default:0
    },
    numReviews:{
        type:Number,
        default:0
    },
    isFeatured:{
        type:Boolean,
        default:false
    },
    dateCreated:{
        type:Date,
        default:Date.now
    }
});

/**
 * 
 * @returns un usuario sin la version y password
 */
ProductosSchema.methods.toJSON=function(){
    const {__v,_id, ...producto}=this.toObject();
    producto.uid=_id;
    return producto;
}

module.exports =model('Producto',ProductosSchema);