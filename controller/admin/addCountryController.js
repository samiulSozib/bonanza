exports.getAddContry=async(req,res,next)=>{
    try{
        return res.status(200).render('admin/generalInfo/addCountry',{title:"Add Country"})
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}
