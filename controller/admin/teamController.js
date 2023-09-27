const db=require('../../config/database')
const helper=require('../../config/helper')


// get managing Director page
exports.getManagingDirector=async(req,res,next)=>{
    try{
        const findMDirector='SELECT * FROM m_d_information WHERE id=1'
        const categories=await helper.fetchCategories()
        db.query(findMDirector,(err,mdInfo)=>{
            if(err){
                throw err
            }
            return res.status(200).render('admin/teamExpert/managingDirector',{title:"Managing Director",categories,nav:"team",mdInfo})
        })
        
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}

// update managing Director 
exports.updateManagingDirector=async(req,res,next)=>{
    try{
        let {name,designation,email,phoneNumber,instagram,facebook,twitter,statement}=req.body
        let id=req.params.id
        let findMDInfo='SELECT * FROM m_d_information WHERE id=?'
        let updateMDInfor = 'UPDATE m_d_information SET name = ?, designation = ?,image = ?,statement = ?, phoneNumber = ?, email = ?, instagram = ?,facebook = ?, twitter = ? WHERE id = ?';
        

        db.beginTransaction((err)=>{
            if(err){
                throw err 
            }
            db.query(findMDInfo,[id],(err,mdInfo)=>{
                if(err){
                    db.rollback(()=>{
                        throw err 
                    })
                }
                let image=mdInfo[0].image
                if(req.file){
                    image = `/uploads/${req.file.filename}`;
                }
    
                let values = [name, designation, image, statement, phoneNumber,email,instagram,facebook,twitter, id];
                db.query(updateMDInfor,values,(err,result)=>{
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
                        return res.redirect(`/dashboard/managingDirector`)
                    })
                })
            })
        })
        
    }catch(e){
        return res.status(500).json({msg:'Internal Server Error'})
    }
}


// get all team expert page
exports.getTeamExperts=async(req,res,next)=>{
    try{
        const findAllTeam='SELECT * FROM team'
        const categories=await helper.fetchCategories()
        db.query(findAllTeam,(err,experts)=>{
            if(err){
                throw err
            }
            return res.status(200).render('admin/teamExpert/teamExperts',{title:"Team Experts",categories,nav:"team",experts})
        })

        
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}


// get insert team expert page 
exports.getAddTeamExpert=async(req,res,next)=>{
    try{
        const categories=await helper.fetchCategories()
        return res.status(200).render('admin/teamExpert/addTeamExpert',{title:"Add Team Experts",categories,nav:"team"})
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}


// post team expert page 
exports.postTeamExpert=async(req,res,next)=>{
    try{
        let {name,designation,phoneNumber,email}=req.body
        let image=''
        if(req.file){
            image=`/uploads/${req.file.filename}`
        }
        
        let insertTeamExpert=`INSERT INTO team(name,designation,phoneNumber,email,image)VALUES(?,?,?,?,?)`
        let values=[name,designation,phoneNumber,email,image]

        db.query(insertTeamExpert,values,(err,result)=>{
            if(err){
                throw err
            }
            return res.redirect('/dashboard/teamExpert')
            return res.json(result)
        })

    }catch(e){
        
    }
}



// get single team expert
exports.getSingleTeam=async(req,res,next)=>{
    try{
        const expertId=req.params.id 
        const findExpertById='SELECT * FROM team WHERE id=?'
        const categories=await helper.fetchCategories()
        db.query(findExpertById,expertId,(err,expert)=>{
            if(err){
                throw err
            }
            return res.status(200).render('admin/teamExpert/singleTeam',{title:"Team Single",categories,nav:"team",expert})
        })

    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}

// update single team expert 
exports.updateSingleTeam=async(req,res,next)=>{
    try{
        let id=req.params.id
        let { name, designation, phoneNumber, email } = req.body;
        let findTeamExpert='SELECT * FROM team WHERE id=?'
        let updateTeamExpert = 'UPDATE team SET name = ?, designation = ?, phoneNumber = ?, email = ?, image = ? WHERE id = ?';
        

        db.beginTransaction((err)=>{
            if(err){
                throw err 
            }
            db.query(findTeamExpert,[id],(err,expert)=>{
                if(err){
                    db.rollback(()=>{
                        throw err 
                    })
                }
                let image=expert[0].image
                if(req.file){
                    image = `/uploads/${req.file.filename}`;
                }
                console.log(expert[0])
                let values = [name, designation, phoneNumber, email, image, id];
                
                db.query(updateTeamExpert,values,(err,result)=>{
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
                        return res.redirect(`/dashboard/teamSingle/${id}`)
                    })
                })
            })
        })

        

    }catch(e){
        return res.status(500).json({msg:'Internal Server Error'})
    }
}


// delete team expert 

exports.deleteTeamExpert=async(req,res,next)=>{
    try{
        let id=req.params.id
        let deleteTeamExpertQuery='DELETE FROM team WHERE id = ?'
        db.query(deleteTeamExpertQuery,[id],(err,result)=>{
            if(err){
                throw err 
            }
            return res.redirect('/dashboard/teamExpert')
        })
    }catch(e){
        return res.status(500).json({msg:'Internal Server Error'})
    }
}

