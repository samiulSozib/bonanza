exports.getTestimonial=async(req,res,next)=>{
    try{
        return res.status(200).render('admin/testimonial',{title:"Testimonial"})
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}