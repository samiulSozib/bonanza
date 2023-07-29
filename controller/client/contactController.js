const db=require('../../config/database')


exports.getContact=async(req,res,next)=>{
    try{
        const findContactDropDown='SELECT * FROM contact_form_dropdown'
        db.query(findContactDropDown,(err,contactDropdown)=>{
            if(err){
                throw err
            }
            return res.status(200).render('client/contactUs',{navStatus:"contact",contactDropdown});
        })
        return res.status(200).render('client/contactUs',{navStatus:"contact"});
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}