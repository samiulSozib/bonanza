const db=require('../../config/database')
const helper=require('../../config/helper')


exports.getTestimonial=async(req,res,next)=>{
    try{
        let findAllTestinomial='SELECT * FROM testimonials'
        const categories=await helper.fetchCategories()

        db.query(findAllTestinomial,(err,testimonials)=>{
            if(err){
                throw err 
            }
            
            return res.status(200).render('admin/testimonial/testimonial',{title:"Testimonial",nav:"testimonial",testimonials,categories})
        })

       
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}

// add testimonial page

exports.getAddTastimonial=async(req,res,next)=>{
    try{
        const categories=await helper.fetchCategories()
        return res.status(200).render('admin/testimonial/addTestimonial',{title:"Testimonial",nav:"testimonial",categories})
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}

// post testimonial

exports.postTestimonial=async(req,res,next)=>{
    try{
        let {name,location,text}=req.body
        let image=''
        if(req.file){
            image=`/uploads/${req.file.filename}`
        }
        
        let insertTestimonial=`INSERT INTO testimonials(name,location,text,image)VALUES(?,?,?,?)`
        let values=[name,location,text,image]

        db.query(insertTestimonial,values,(err,result)=>{
            if(err){
                throw err
            }
            return res.redirect('/dashboard/testimonial')
        })
    }catch(e){
        return res.status(500).json({msg:'Internal Server Error'})
    }
}

// delete testimonial

exports.deleteTestimonial=async(req,res,next)=>{
    try{
        let id=req.params.id
        let deleteTestimonialQuery='DELETE FROM testimonials WHERE id = ?'
        
        db.query(deleteTestimonialQuery,[id],(err,result)=>{
            if(err){
                throw err 
            }
            return res.redirect('/dashboard/testimonial')
        })
    }catch(e){
        return res.status(500).json({msg:'Internal Server Error'})
    }
}

// get single testimonial
exports.getSingleTestimonail=async(req,res,next)=>{
    try{
        const testimonialId=req.params.id 
        const findTestimonialById='SELECT * FROM testimonials WHERE id=?'
        const categories=await helper.fetchCategories()

        db.query(findTestimonialById,[testimonialId],(err,testimonial)=>{
            if(err){
                throw err
            }
            return res.status(200).render('admin/testimonial/singleTestimonial',{title:"Team Single",categories,nav:"testimonial",testimonial})
        })

    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}


// update testimonial

exports.updateTestimonial=async(req,res,next)=>{
    try{
        let id=req.params.id
        let { name, text, location } = req.body;
        let findTestimonial='SELECT * FROM testimonials WHERE id=?'
        let updateTestimonialQuery = 'UPDATE testimonials SET name = ?, text = ?, location = ?, image = ? WHERE id = ?';
        

        db.beginTransaction((err)=>{
            if(err){
                throw err 
            }
            db.query(findTestimonial,[id],(err,testimonial)=>{
                if(err){
                    db.rollback(()=>{
                        throw err 
                    })
                }
                let image=testimonial[0].image
                if(req.file){
                    image = `/uploads/${req.file.filename}`;
                }
                
                let values = [name, text, location, image, id];
                
                db.query(updateTestimonialQuery,values,(err,result)=>{
                    if(err){
                        db.rollback(()=>{
                            throw err 
                        })
                    }
                    db.commit((err)=>{
                        if(err){
                            db.rollback(()=>{
                                throw err
                            })
                        }
                        return res.redirect(`/dashboard/testimonial/${id}`)
                    })
                })
            })
        })

        

    }catch(e){
        return res.status(500).json({msg:'Internal Server Error'})
    }
}