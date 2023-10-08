const db=require('../../config/database')

exports.getEnquiry=async(req,res,next)=>{
    try{
        let findHomeBanner='SELECT * FROM herobanner'
        const  heroBanner=await queryAsyncWithoutValue(findHomeBanner)
        return res.status(200).render('client/enquiry',{navStatus:"enquiry",heroBanner});
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}


function queryAsyncWithoutValue(query) {
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }