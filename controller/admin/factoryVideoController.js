const db=require('../../config/database')
const helper=require('../../config/helper')

exports.getFactoryVideo=async(req,res,next)=>{
    try{
        const factory_video_query=`SELECT * FROM factory_video`;

        let factory_video=await queryAsyncWithoutValue(factory_video_query)
        const categories=await helper.fetchCategories()
 
        return res.status(200).render('admin/generalInfo/factoryVideo',{title:"Factory Video",nav:"generalInfo",categories,factory_video})
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}


exports.getAddFactoryVideo=async(req,res,next)=>{
  try{
      
      const categories=await helper.fetchCategories()

      return res.status(200).render('admin/generalInfo/factoryVideoAdd',{title:"Factory Video",nav:"generalInfo",categories})
  }catch(e){
      console.log(e)
      return res.status(500).json({msg:'Internal Server Error'})
  }
}

exports.postAddFactoryVideo=async(req,res,next)=>{
  try{
      let {title,link}=req.body
      const categories=await helper.fetchCategories()
    	const insert_factory_video_query='INSERT INTO factory_video (title,link) VALUES (?,?)'
      const values=[title,link]
      await queryAsync(insert_factory_video_query,values)
      return res.status(200).redirect('/dashboard/factory-video')
  }catch(e){
      console.log(e)
      return res.status(500).json({msg:'Internal Server Error'})
  }
}


exports.getUpdateFactoryVideo=async(req,res,next)=>{
  try{
      let id=req.params.video_id
      const categories=await helper.fetchCategories()
      const factory_video_query='SELECT * FROM factory_video WHERE id =?'
      const video=await queryAsync(factory_video_query,[id])
      //return res.json(video)
      return res.status(200).render('admin/generalInfo/factoryVideoUpdate',{title:"Factory Video",nav:"generalInfo",categories,video:video[0]})
  }catch(e){
      console.log(e)
      return res.status(500).json({msg:'Internal Server Error'})
  }
}

exports.postUpdateFactoryVideo=async(req,res,next)=>{
  try{
    let id=req.params.video_id
      let {title,link}=req.body
    	const update_factory_video_query='UPDATE factory_video SET title=?, link=? WHERE id=?'
      const values=[title,link,id]
      await queryAsync(update_factory_video_query,[title,link,id])
      return res.status(200).redirect('/dashboard/factory-video')
  }catch(e){
      console.log(e)
      return res.status(500).json({msg:'Internal Server Error'})
  }
}

// delete factory video

exports.deleteFactoryVideo=async(req,res,next)=>{
  try{
      let id=req.params.video_id
      let deleteFactoryVideoQuery='DELETE FROM factory_video WHERE id = ?'
      db.query(deleteFactoryVideoQuery,[id],(err,result)=>{
          if(err){
              throw err 
          }
          return res.redirect('/dashboard/factory-video')
      })
  }catch(e){
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