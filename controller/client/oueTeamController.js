exports.getOurTeam=async(req,res,next)=>{
    try{
        return res.status(200).render('client/ourTeam',{navStatus:"team"});
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}