const db=require('../../config/database')


exports.getContact=async(req,res,next)=>{
    try{
        const findContactDropDown='SELECT * FROM contact_form_dropdown'
        let findHomeBanner='SELECT * FROM herobanner'
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
                    return res.status(200).render('client/contactUs',{navStatus:"contact",heroBanner,contactDropdown});
                })
            })
        })
        //return res.status(200).render('client/contactUs',{navStatus:"contact"});
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}