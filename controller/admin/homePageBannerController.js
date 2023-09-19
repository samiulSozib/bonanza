const db=require('../../config/database')
const helper=require('../../config/helper')

exports.getHomePageBanner=async(req,res,next)=>{
    try{
        let getHomeBanner='SELECT * FROM herobanner'
        const categories=await helper.fetchCategories()
        db.query(getHomeBanner,(err,homeBanner)=>{
            if(err){
                throw err 
            }
           //return res.json(homeBanner)
           return res.status(200).render('admin/generalInfo/homePageBanner',{title:"Home Banner",categories,nav:"generalInfo",homeBanner})
        })
        
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}


// update herobanner

exports.updateHomeBanner=async(req,res,next)=>{
    try{
        let id=req.params.id
        let { heroBannerText,heroBannerSubtext,whatsappNumber } = req.body;
        let findHeroBanner='SELECT * FROM herobanner WHERE id=?'
        let updateHeroBannerQuery = 'UPDATE herobanner SET homePageBanner=?, heroBannerText = ?,heroBannerSubtext=?,logoBGWhite=?,logo=?, whatsappNumber = ? WHERE id = ?';
        

        db.beginTransaction((err)=>{
            if(err){
                throw err 
            }
            db.query(findHeroBanner,[id],(err,info)=>{
                if(err){
                    db.rollback(()=>{
                        throw err 
                    })
                }
                let homePageBanner=info[0].homePageBanner
                let logoBGWhite=info[0].logoBGWhite
                let logo=info[0].logo
                if(req.files){
                    let{hero_image,logo1_image,logo2_image}=req.files
                    if(hero_image){
                        
                        homePageBanner=`/uploads/${hero_image[0].filename}`;
                    }
                    if(logo1_image){
                        
                        logoBGWhite=`/uploads/${logo1_image[0].filename}`;
                    }
                    if(logo2_image){
                        
                        logo=`/uploads/${logo2_image[0].filename}`;
                    }
                }
                
                let values = [homePageBanner, heroBannerText,heroBannerSubtext,logoBGWhite,logo,whatsappNumber, id];
                
                db.query(updateHeroBannerQuery,values,(err,result)=>{
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
                        return res.redirect(`/dashboard/homeBanner`)
                    })
                })
            })
        })

        

    }catch(e){
        return res.status(500).json({msg:'Internal Server Error'})
    }
}