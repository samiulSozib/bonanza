const db=require('../../config/database')


// get country page
exports.getCountry=async(req,res,next)=>{
    try{
        let getCountryQuery='SELECT * FROM country'
        db.query(getCountryQuery,(err,countries)=>{
            if(err){
                throw err 
            }
            return res.status(200).render('admin/generalInfo/countryList',{title:"Country",countries})
        })
        
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}


// add country page 
exports.getAddCountry=async(req,res,next)=>{
    try{
        return res.status(200).render('admin/generalInfo/addCountry',{title:"Add Country"})
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}

// post country page 
exports.postCountry=async(req,res,next)=>{
    try{
        let {name}=req.body
        let image=''
        if(req.file){
            image=`/uploads/${req.file.filename}`
        }
        
        let insertCountry=`INSERT INTO country(name,image)VALUES(?,?)`
        let values=[name,image]

        db.query(insertCountry,values,(err,result)=>{
            if(err){
                throw err
            }
            return res.redirect('/dashboard/country')
        })
    }catch(e){
        return res.status(500).json({msg:'Internal Server Error'})
    }
}

// delete country 
exports.deleteCountry=async(req,res,next)=>{
    try{
        let id=req.params.id
        let deleteCountryQuery='DELETE FROM country WHERE id = ?'
        db.query(deleteCountryQuery,[id],(err,result)=>{
            if(err){
                throw err 
            }
            return res.redirect('/dashboard/country')
        })
    }catch(e){
        return res.status(500).json({msg:'Internal Server Error'})
    }
}

// get single country
exports.getSingleCountry=async(req,res,next)=>{
    try{
        const countryId=req.params.id 
        const findCountrylById='SELECT * FROM country WHERE id=?'

        db.query(findCountrylById,[countryId],(err,country)=>{
            if(err){
                throw err
            }
            return res.status(200).render('admin/generalInfo/singleCountry',{title:"Country",country})
        })

    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
} 


// update country

exports.updateCountry=async(req,res,next)=>{
    try{
        let id=req.params.id
        let { name } = req.body;
        let findCountry='SELECT * FROM country WHERE id=?'
        let updateCountryQuery = 'UPDATE country SET name = ?, image = ? WHERE id = ?';
        

        db.beginTransaction((err)=>{
            if(err){
                throw err 
            }
            db.query(findCountry,[id],(err,country)=>{
                if(err){
                    db.rollback(()=>{
                        throw err 
                    })
                }
                let image=country[0].image
                if(req.file){
                    image = `/uploads/${req.file.filename}`;
                }
                
                let values = [name, image, id];
                
                db.query(updateCountryQuery,values,(err,result)=>{
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
                        return res.redirect(`/dashboard/country/${id}`)
                    })
                })
            })
        })

        

    }catch(e){
        return res.status(500).json({msg:'Internal Server Error'})
    }
}