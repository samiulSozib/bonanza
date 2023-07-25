const db=require('../../../config/database')


// get category
exports.getSubCategoriesByCategory=async(req,res,next)=>{
    let category_id=req.params.categoryId
    let getSubCategoriesQuery='SELECT * FROM sub_categories where category_id=?'
    try{
        console.log(category_id)
        let subCategory=await queryAsync(getSubCategoriesQuery,category_id)
        return res.json(subCategory)
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}


// delete porduct image 
exports.deleteProductImage=async(req,res,next)=>{
  let product_image_id=req.params.id
  try{
    let delteProductImageQuery='DELETE FROM product_images WHERE id = ?'
    await queryAsync(delteProductImageQuery,product_image_id)
    return res.status(200).json({msg:'Image delete success'})
  }catch(e){
    console.log(e)
      return res.status(500).json({msg:'Internal Server Error'})
  }
}

// delete product video
exports.deleteProductVideo=async(req,res,next)=>{
  let product_video_id=req.params.id
  try{
    let delteProductVideoQuery='DELETE FROM product_video WHERE id = ?'
    await queryAsync(delteProductVideoQuery,product_video_id)
    return res.status(200).json({msg:'Video delete success'})
  }catch(e){
    console.log(e)
      return res.status(500).json({msg:'Internal Server Error'})
  }
}


// delete product 

exports.deleteProduct=async(req,res,next)=>{
  let product_id=req.params.id
  try{
    console.log(product_id)
    
        // delete image video product_category product_sub_category
        const deleteProductQuery = 'DELETE FROM products WHERE id = ?'
          await queryAsync(deleteProductQuery,product_id)
          return res.status(200).json({msg:'Product delete success'})
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