const db=require('../../config/database')


exports.getHomePage=async(req,res,next)=>{
    try{
        const findAllTestimonial='SELECT * FROM testimonials'
        let findHomeBanner='SELECT * FROM herobanner'
        const findContactDropDown='SELECT * FROM contact_form_dropdown'
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
                db.query(findContactDropDown,(err,contactDropdown)=>{
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
                        return res.status(200).render('client/home',{navStatus:"home",testimonials,heroBanner,contactDropdown})
                    })
                })
            })

           })
        })
       
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}