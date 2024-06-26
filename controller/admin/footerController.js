const db=require('../../config/database')
const helper=require('../../config/helper')

exports.getFooterInfo=async(req,res,next)=>{
    try{
        let getInfo='SELECT * FROM contact_information LIMIT 2'
        const categories=await helper.fetchCategories()
        db.query(getInfo,(err,info)=>{
            if(err){
                throw err 
            }
            //return res.json(info)
            return res.status(200).render('admin/generalInfo/footerInfo',{title:"Footer Information",categories,nav:"generalInfo",info})
        })

        
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}


// update Information

exports.updateFooterInfo=async(req,res,next)=>{
    try{
        let id=req.params.id
        let id1=req.params.id1
        let {name,name1,designation,designation1,phoneNumber,phoneNumber1,email,email1,location,location1}=req.body
        let updateQuery = 'UPDATE contact_information SET name = ?, designation = ?, phoneNumber = ?, email = ?, location = ? WHERE id = ?';
        let value=[name,designation,phoneNumber,email,location,id]
        let value1=[name1,designation1,phoneNumber1,email1,location1,id1]

        db.beginTransaction((err)=>{
            if(err){
                throw err 
            }
            db.query(updateQuery,value,(err,result)=>{
                if(err){
                    db.rollback(()=>{
                        throw err 
                    })
                }
                db.query(updateQuery,value1,(err,result1)=>{
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
                        return res.redirect('/dashboard/footerInformation')
                    })
                })
            })
        })

    }catch(e){
        return res.status(500).json({msg:'Internal Server Error'})
    }
}