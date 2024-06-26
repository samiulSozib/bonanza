const db=require('../../config/database')

exports.getAboutUsPage=async(req,res,next)=>{
    try{
        const findCounties='SELECT * FROM country'
        const findBasicInformation='SELECT * FROM basic_information'
        const findCertification='SELECT * FROM certification'
        const findContactDropDown='SELECT * FROM contact_form_dropdown'
        let findHomeBanner='SELECT * FROM herobanner'
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
                db.query(findCertification,(err,certifications)=>{
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
                                return res.status(200).render('client/aboutUs',{navStatus:"about",heroBanner,countries,basicInfo,certifications,contactDropdown});
                            })
                        })
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