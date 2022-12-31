

const { response } = require('express');
const Category=require('../models/categorias.models');

const categorysGet=async(req, res=response)=>{
    const [total,category]=await Promise.all([
        Category.countDocuments(),
        Category.find()
    ]);
    res.json({
        ok:true,
        total,
        category
    })
}

const categorysPost = async(req, res=response)=>{
    const {nombre,icono,color}=req.body;

    const category=new Category({
        name:nombre,
        icon:icono,
        color:color
    });

    await category.save();

    res.json({
        ok:true,
        category
    })
}

const categorysPut=async(req,res=response)=>{
    const {id}=req.params;
    const {nombre,icono,color}=req.body;

    const category=await Category.findByIdAndUpdate(id,{
        name:nombre,
        icon:icono,
        color:color    
    });

    category.save();

    res.json({
        ok:true,
        category
    })
}

const categorysDelete=async(req, res=response)=>{

    const {id} = req.params;

    const category=await Category.findByIdAndDelete(id);

    res.json({
        ok:true,
        category,
        msg:'Registro Eliminado.'
    })
}




module.exports={
    categorysGet,
    categorysPost,
    categorysPut,
    categorysDelete
}