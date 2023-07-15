exports.getAboutUsPage=async(req,res,next)=>{
    try{
        return res.status(200).render('client/aboutUs',{navStatus:"about"});
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}