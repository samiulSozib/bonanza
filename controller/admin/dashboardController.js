const helper=require('../../config/helper')

exports.getDashboard=async(req,res,next)=>{
    try{
        const categories=await helper.fetchCategories()
        //return res.json(categories)
        return res.status(200).render('admin/dashboard',{
            title:"Home",
            nav:"dashboard",
            categories
        })
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}
