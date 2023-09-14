const db=require('../../config/database')

exports.getProfile=async(req,res,next)=>{
    try{
        let adminId=req.admin
        
        let getAdminQuery='SELECT * FROM admin WHERE id=?'
        db.query(getAdminQuery,[adminId],(err,admin)=>{
            if(err){
                throw err 
            }
            return res.status(200).render('admin/generalInfo/profile',{title:"Profile",nav:"generalInfo",admin})
            
        })
        
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}

// update profile 
exports.updateAdmin=async(req,res,next)=>{
    try{
        let id=req.params.id
        let { full_name,email,username,phone_number,bio } = req.body;
        let findAdmin='SELECT * FROM admin WHERE id=?'
        let updateAdminQuery = 'UPDATE admin SET username = ?, image = ?, full_name=?, bio=?,email=?,phone_number=? WHERE id = ?';
        

        db.beginTransaction((err)=>{
            if(err){
                throw err 
            }
            db.query(findAdmin,[id],(err,admin)=>{
                if(err){
                    db.rollback(()=>{
                        throw err 
                    })
                }
                let image=admin[0].image
                if(req.file){
                    image = `/uploads/${req.file.filename}`;
                }
                
                let values = [username, image, full_name,bio,email,phone_number,id];
                
                db.query(updateAdminQuery,values,(err,result)=>{
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
                        return res.redirect(`/dashboard/profile`)
                    })
                })
            })
        })

        

    }catch(e){
        return res.status(500).json({msg:'Internal Server Error'})
    }
}