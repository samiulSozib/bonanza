const db=require('../../config/database')


exports.getFactory=async(req,res,next)=>{
    try{
        const get_question_answer='SELECT * FROM frequently_question'
        const question_answer=await queryAsyncWithoutValue(get_question_answer)
        const get_factory_video='SELECT * FROM factory_video'
        const factory_video=await queryAsyncWithoutValue(get_factory_video)
        const findContactDropDown='SELECT * FROM contact_form_dropdown'
        const contactDropdown=await queryAsyncWithoutValue(findContactDropDown)
        return res.status(200).render('client/factory',{navStatus:"factory",contactDropdown,question_answer,factory_video});
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