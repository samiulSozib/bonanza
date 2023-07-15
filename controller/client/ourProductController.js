exports.getOurProduct=async(req,res,next)=>{
    try{
        return res.status(200).render('client/ourProduct',{navStatus:"product"});
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}


exports.getProductDetails=async(req,res,next)=>{
    try{
        return res.status(200).render('client/productDetails',{navStatus:"product"});
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}