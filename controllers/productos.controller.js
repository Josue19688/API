

const Productos =require('../models/productos.models');
const Category=require('../models/categorias.models');

const productosGet=async(req, res=response)=>{

    const [total,producto]=await Promise.all([
        Productos.countDocuments(),
        Productos.find()
    ]);
    res.json({
        ok:true,
        total,
        producto
    })

}

const productosPost=async(req,res=response)=>{


    const {
        nombre,
        descripcion,
        richDescripcion,
        image,
        brand,
        price,
        category,
        stock,
        rating,
        numReviews,
        isFeature
    } = req.body;

    try {

        const categoria= await Category.findById(category);
        if(!categoria){
            return res.status(400).json({
                ok:false,
                msg:'Categoria invalida.'
            })
        }
        const producto = new Productos({
            name:nombre,
            descripcion:descripcion,
            richDescripcion:richDescripcion,
            imagen:image,
            brand:brand,
            price:price,
            category:category,
            countInStock:stock,
            rating:rating,
            numReviews:numReviews,
            isFeature:isFeature
        });
    
        await producto.save();
    
        res.json({
            ok:true,
            producto
        })
        
    } catch (error) {
        return res.status(400).json({
            msg:'No se pudo crear el registro.'
        });
    }
   


}

const productosPut = async(req,res=response)=>{
    const {id}=req.params;
    const {
        nombre,
        descripcion,
        richDescripcion,
        image,
        brand,
        price,
        category,
        stock,
        rating,
        numReviews,
        isFeature
    } = req.body;

    try {
        
        const existeProducto=await Productos.findById(id);
        if(!existeProducto){
            return res.status(400).json({
                ok:false,
                msg:'El producto no existe'
            })
        }

        const producto = await Productos.findByIdAndUpdate(id,{
            name:nombre,
            descripcion:descripcion,
            richDescripcion:richDescripcion,
            imagen:image,
            brand:brand,
            price:price,
            category:category,
            countInStock:stock,
            rating:rating,
            numReviews:numReviews,
            isFeature:isFeature
        })
        
        const productoEditado= await producto.save();
        res.json({
            ok:true,
            productoEditado
        })
    
    } catch (error) {
        return res.status(400).json({
            msg:'No se pudo actualizar el registro.'
        });
    }
}

const productosDelete=async(req,res=response)=>{

    const {id} = req.params;

    try {

        const existeProducto=await Productos.findById(id);
        if(!existeProducto){
            return res.status(400).json({
                ok:false,
                msg:'El producto no existe'
            })
        }

        const producto=await Productos.findByIdAndDelete(id);

        res.json({
            ok:true,
            producto,
            msg:'Registro elimnado'
        })

        
    } catch (error) {
        return res.status(400).json({
            msg:'No se encontro el registro.'
        });
    }
}

module.exports={
    productosGet,
    productosPost,
    productosPut,
    productosDelete
}