exports.getHomePageBanner=async(req,res,next)=>{
    try{
        return res.status(200).render('admin/homePageBanner',{title:"Home Banner"})
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}
