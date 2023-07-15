exports.getTeam=async(req,res,next)=>{
    try{
        return res.status(200).render('admin/team',{title:"Team"})
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}


exports.getSingleTeam=async(req,res,next)=>{
    try{
        return res.status(200).render('admin/singleTeam',{title:"Team Single"})
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}