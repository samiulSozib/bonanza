const db=require('../../config/database')
const helper=require('../../config/helper')

exports.getSocialMedia=async(req,res,next)=>{
    try{
        const social_media_link_query=`SELECT * FROM social_media_link`;

        let social_media_link=await queryAsyncWithoutValue(social_media_link_query)
        const categories=await helper.fetchCategories()
 
        return res.status(200).render('admin/generalInfo/socialMediaLink',{title:"Social Media",categories,nav:"generalInfo",social_media_link})
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}


exports.getSocialMediaUpdate=async(req,res,next)=>{
  try{
    let id=req.params.social_media_link_id
      const social_media_link_query=`SELECT * FROM social_media_link WHERE id = ?`;

      let social_media=await queryAsync(social_media_link_query,[id])
      const categories=await helper.fetchCategories()

      return res.status(200).render('admin/generalInfo/updateSocialMedia',{title:"Social Media",categories,nav:"generalInfo",social_media:social_media[0]})
  }catch(e){
      console.log(e)
      return res.status(500).json({msg:'Internal Server Error'})
  }
}

exports.socialMediaUpdate=async(req,res,next)=>{
  try{
    let id=req.params.social_media_link_id
    let {link}=req.body
      const social_media_update_link_query=`UPDATE social_media_link SET link = ? WHERE id = ?`;

      await queryAsync(social_media_update_link_query,[link,id])

      return res.status(200).redirect('/dashboard/social-media-link')
  }catch(e){
      console.log(e)
      return res.status(500).json({msg:'Internal Server Error'})
  }
}



// Helper function to wrap db.query in a promise
function queryAsync(query, values) {
    return new Promise((resolve, reject) => {
      db.query(query, values, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
  function queryAsyncWithoutValue(query) {
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }