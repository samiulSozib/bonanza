const db=require('../../config/database')

exports.getProductList=async(req,res,next)=>{
    try{
        return res.status(200).render('admin/product/productList',{title:"Product List"})
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}


exports.getAddProduct=async(req,res,next)=>{
    try{
        return res.status(200).render('admin/product/addProduct',{title:"Add Product"})
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}



