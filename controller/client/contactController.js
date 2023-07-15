exports.getContact=async(req,res,next)=>{
    try{
        return res.status(200).render('client/contactUs',{navStatus:"contact"});
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}