const db=require('../../config/database')


exports.getHomePage=async(req,res,next)=>{
    try{
        const findAllTestimonial='SELECT * FROM testimonials'
        let findHomeBanner='SELECT * FROM herobanner'
        db.beginTransaction((err)=>{
           if(err){
            throw err
           }

           db.query(findAllTestimonial,(err,testimonials)=>{
            if(err){
                db.rollback(()=>{
                    throw err
                })
            }

            db.query(findHomeBanner,(err,heroBanner)=>{
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
                    return res.status(200).render('client/home',{navStatus:"home",testimonials,heroBanner})
                })
            })

           })
        })
       
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}