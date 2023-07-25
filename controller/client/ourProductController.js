const db=require('../../config/database')

exports.getOurProduct=async(req,res,next)=>{
    try{
        const findBasicInformation='SELECT * FROM basicInformation'
        db.beginTransaction(async(err)=>{
            if(err){
                throw err 
            }

            try{
                const basicInfo=await queryAsyncWithoutValue(findBasicInformation)

                const categoryAndSubCategoryQuery=`SELECT c.id as category_id, c.category_name, s.id AS subcategory_id, s.subcategory_name
                                            FROM categories c
                                            LEFT JOIN sub_categories s ON s.category_id = c.id
                                            ORDER BY c.id`

                const categoryData=await queryAsyncWithoutValue(categoryAndSubCategoryQuery)

                const categories = categoryData.reduce((result, item) => {
                    const { category_id, category_name, subcategory_id, subcategory_name } = item;
                  
                    const categoryObj = result.find((obj) => obj.category_id === category_id);
                    if (!categoryObj) {
                      result.push({
                        category_id,
                        category_name,
                        subcategories: subcategory_id ? [{ subcategory_id, subcategory_name }] : [],
                      });
                    } else {
                      if (subcategory_id) {
                        categoryObj.subcategories.push({ subcategory_id, subcategory_name });
                      }
                    }
                  
                    return result;
                  }, []);

                  const allProductsQuery=`SELECT 
                              p.*,
                              pi.id as image_id,
                              pi.image,
                              pi.featured_image AS is_featured,
                              pv.id as video_id,
                              pv.video,
                              c.id as cat_id,
                              c.category_name,
                              sc.id as subCat_id,
                              sc.subcategory_name
                          FROM
                              products p
                          LEFT JOIN product_images pi ON p.id = pi.product_id
                          LEFT JOIN product_video pv ON p.id = pv.product_id
                          LEFT JOIN product_sub_category psc ON p.id = psc.product_id
                          LEFT JOIN sub_categories sc ON psc.sub_category_id = sc.id
                          LEFT JOIN product_category pc ON p.id = pc.product_id
                          LEFT JOIN categories c ON pc.category_id = c.id`;


        
        let data=await queryAsyncWithoutValue(allProductsQuery)
        const nestedData = {};

        data.forEach((product) => {
          const { id, image_id,image, is_featured,video_id, video,cat_id,subCat_id, category_name, subcategory_name, ...productData } = product;

          if (nestedData[id]) {
            nestedData[id].images.push({ image_id,image, is_featured });
            if (video) {
              nestedData[id].video = [{video_id,video}];
            }
          } else {
            nestedData[id] = {
              id,
              ...productData,
              images: [{ image_id,image, is_featured }],
              video: [{video_id,video}] || null,
              cat_id,
              category_name,
              subCat_id,
              subcategory_name
              
            };
          }
        });

        const allProducts = Object.values(nestedData);


                db.commit((err)=>{
                    if(err){
                        db.rollback(()=>{
                            throw err 
                        })
                    }
                    //return res.json(categories)
                    return res.status(200).render('client/ourProduct',{navStatus:"product",basicInfo,categories,allProducts});
                })
            }catch(e){
                db.rollback(()=>{
                    throw e
                })
            }
        })
        
        
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}


exports.getProductDetails=async(req,res,next)=>{
    try{
        return res.status(200).render('client/productDetails',{navStatus:"product"});
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
