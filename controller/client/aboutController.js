const db=require('../../config/database')

exports.getAboutUsPage=async(req,res,next)=>{
    try{
        const findCounties='SELECT * FROM country'
        const findBasicInformation='SELECT * FROM basicInformation'
        db.beginTransaction((err)=>{
           if(err){
            throw err
           }

           db.query(findCounties,(err,countries)=>{
            if(err){
                db.rollback(()=>{
                    throw err
                })
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
                    return res.status(200).render('client/aboutUs',{navStatus:"about",countries,basicInfo});
                })
            })

           })
        })
        
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}