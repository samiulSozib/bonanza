const db=require('../../config/database')


// get certification page
exports.getCertification=async(req,res,next)=>{
    try{
        let getCertificationQuery='SELECT * FROM certification'
        db.query(getCertificationQuery,(err,certifications)=>{
            if(err){
                throw err 
            }
            return res.status(200).render('admin/generalInfo/certification',{title:"Certification",nav:"generalInfo",certifications})
        })
        
        
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}

// add certification page 
exports.getAddCertification=async(req,res,next)=>{
    try{
        return res.status(200).render('admin/generalInfo/addCertification',{title:"Add Certification",nav:"generalInfo"})
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}

// post certification page 
exports.postCertification=async(req,res,next)=>{
    try{
        let {name}=req.body
        let image=''
        if(req.file){
            image=`/uploads/${req.file.filename}`
        }
        
        let insertCertification=`INSERT INTO certification(name,image)VALUES(?,?)`
        let values=[name,image]

        db.query(insertCertification,values,(err,result)=>{
            if(err){
                throw err
            }
            return res.redirect('/dashboard/certification')
        })
    }catch(e){
        return res.status(500).json({msg:'Internal Server Error'})
    }
}


// delete certification 
exports.deleteCertification=async(req,res,next)=>{
    try{
        let id=req.params.id
        let deleteCertificationQuery='DELETE FROM certification WHERE id = ?'
        db.query(deleteCertificationQuery,[id],(err,result)=>{
            if(err){
                throw err 
            }
            return res.redirect('/dashboard/certification')
        })
    }catch(e){
        return res.status(500).json({msg:'Internal Server Error'})
    }
}


// get single certification
exports.getSingleCertification=async(req,res,next)=>{
    try{
        const certificationId=req.params.id 
        const findCertificationById='SELECT * FROM certification WHERE id=?'

        db.query(findCertificationById,[certificationId],(err,certification)=>{
            if(err){
                throw err
            }
            return res.status(200).render('admin/generalInfo/singleCertification',{title:"Certification",nav:"generalInfo",certification})
        })

    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
} 

// update certification

exports.updateCertification=async(req,res,next)=>{
    try{
        let id=req.params.id
        let { name } = req.body;
        let findCertification='SELECT * FROM certification WHERE id=?'
        let updateCertificationQuery = 'UPDATE certification SET name = ?, image = ? WHERE id = ?';
        

        db.beginTransaction((err)=>{
            if(err){
                throw err 
            }
            db.query(findCertification,[id],(err,certification)=>{
                if(err){
                    db.rollback(()=>{
                        throw err 
                    })
                }
                let image=certification[0].image
                if(req.file){
                    image = `/uploads/${req.file.filename}`;
                }
                
                let values = [name, image, id];
                
                db.query(updateCertificationQuery,values,(err,result)=>{
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
                        return res.redirect(`/dashboard/certification/${id}`)
                    })
                })
            })
        })

        

    }catch(e){
        return res.status(500).json({msg:'Internal Server Error'})
    }
}