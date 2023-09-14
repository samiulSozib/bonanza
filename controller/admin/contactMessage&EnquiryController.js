const db=require('../../config/database')

// get all message 
exports.getContactMessage=async(req,res,next)=>{
    try{
        let getContactMessageQuery='SELECT * FROM contacts'
        db.query(getContactMessageQuery,(err,messages)=>{
            if(err){
                throw err 
            }
            return res.status(200).render('admin/contactMessage',{title:"Message",nav:"contactMessages",messages})
        })
        
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}

// delete message  
exports.deleteContactMessage=async(req,res,next)=>{
    try{
        let id=req.params.id
        let deleteMessageQuery='DELETE FROM contacts WHERE id = ?'
        db.query(deleteMessageQuery,[id],(err,result)=>{
            if(err){
                throw err 
            }
            return res.redirect('/dashboard/contactMessages')
        })
    }catch(e){
        return res.status(500).json({msg:'Internal Server Error'})
    }
}


// get all enquriy 
exports.getEnquiry=async(req,res,next)=>{
    try{
        let getEnquiryQuery='SELECT * FROM enquiry'
        db.query(getEnquiryQuery,(err,enquires)=>{
            if(err){
                throw err 
            }
            return res.status(200).render('admin/enquiry',{title:"Message",nav:"enquiry",enquires})
        })
        
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}

// delete message  
exports.deleteEnquiry=async(req,res,next)=>{
    try{
        let id=req.params.id
        let deleteEnquiryQuery='DELETE FROM enquiry WHERE id = ?'
        db.query(deleteEnquiryQuery,[id],(err,result)=>{
            if(err){
                throw err 
            }
            return res.redirect('/dashboard/enquiry')
        })
    }catch(e){
        return res.status(500).json({msg:'Internal Server Error'})
    }
}