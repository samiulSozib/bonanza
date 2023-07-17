const db=require('../../config/database')

exports.getOurTeam=async(req,res,next)=>{
    try{
        const findOurTeam='SELECT * FROM team'
        const findMDInformation='SELECT * FROM m_d_information LIMIT 1'
        db.beginTransaction((err)=>{
            if(err){
                throw err
            }
            db.query(findOurTeam,(err,teams)=>{
                if(err){
                    db.rollback(()=>{
                        throw err
                    })
                }
                db.query(findMDInformation,(err,mdInformation)=>{
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
                        return res.status(200).render('client/ourTeam',{navStatus:"team",teams,mdInformation});
                    })
                })
            })
        })
        
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}