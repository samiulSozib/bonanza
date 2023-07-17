const db=require('../../config/database')

exports.getOurProduct=async(req,res,next)=>{
    try{
        const findBasicInformation='SELECT * FROM basicInformation'
        db.beginTransaction((err)=>{
           if(err){
            throw err
           }

           db.query(findBasicInformation,(err,basicInfo)=>{
            if(err){
                db.rollback(()=>{
                    throw err
                })
            }

            db.commit((err)=>{
                if(err){
                    db.rollback(()=>{
                        throw err
                    })
                }
                return res.status(200).render('client/ourProduct',{navStatus:"product",basicInfo});
            })

           })
        })
        
        
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