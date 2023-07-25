const db=require('../../config/database')

// get product list page
exports.getProductList=async(req,res,next)=>{
    try{
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
        //return res.json(allProducts)
        return res.status(200).render('admin/product/productList',{title:"Product List",allProducts})
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}



// add product  page 
exports.getAddProduct=async(req,res,next)=>{
    let getCategory='SELECT * FROM categories'
    try{
        

        let categories= await queryAsyncWithoutValue(getCategory)
        //return res.json(categories)
        return res.status(200).render('admin/product/addProduct',{title:"Add Product",categories})
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}



// post product 

exports.postAddProduct=async(req,res,next)=>{
    try{
        const productData = req.body; // Product information from req.body
        const productImages = req.files['product-image']; // Array of images
        const productFeatureImage=req.files['product-featured-image']
        const productVideo = req.files['video'] ? req.files['video'][0] : null; // Single video file

        // Insert the product information into the products table
        const insertProductQuery = `INSERT INTO products 
            (product_name, product_model, unit, fob_price, min_order_quentity, suppy_ability, processing_time,
            packaging_details, product_details) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [
            productData.product_name,
            productData.product_model,
            productData.unit,
            productData.fob_price,
            productData.min_order_quentity,
            productData.suppy_ability,
            productData.processing_time,
            productData.packaging_details,
            productData.product_details,
        ];
        console.log(values)
        console.log(productFeatureImage)
        console.log(productImages)
        console.log(productVideo)

        db.beginTransaction(async(err)=>{
            if(err){
                throw err
            }

            try{
                const product=await queryAsync(insertProductQuery,values)
                const product_id=product.insertId
                

                const insertFeatureImageQuery = `INSERT INTO product_images 
                (product_id, image, featured_image) 
                VALUES (?, ?, ?)`;
                let featureImagePath =`/uploads/${productFeatureImage[0].filename}`
                const featureImageData=[product_id,featureImagePath,true];
                await queryAsync(insertFeatureImageQuery,featureImageData)

                
                const insertOtherImagesQuery = `INSERT INTO product_images (product_id, image, featured_image) VALUES (?, ?, ?)`;
                for (let i = 0; i < productImages.length; i++) {
                    const image = productImages[i];
                    //otherImagesData.push([product_id, `/uploads/${image.filename}`, false]);
                    let otherImageData=[product_id, `/uploads/${image.filename}`, false];
                    await queryAsync(insertOtherImagesQuery, otherImageData);
                }

                
                
                

                if (productVideo) {
                  const insertVideoQuery = `INSERT INTO product_video (product_id, video) VALUES (?, ?)`;
                  await queryAsync(insertVideoQuery, [product_id,`/uploads/${productVideo.filename}`]);
                }



                const insertCategoryQuery = `INSERT INTO product_category (product_id, category_id) VALUES (?, ?)`;
                const insertCategoryData=[product_id,productData.category];
                await queryAsync(insertCategoryQuery,insertCategoryData)

                if(productData.subcategory){
                  const insertSubcategoryQuery = `INSERT INTO product_sub_category (product_id, sub_category_id) VALUES (?, ?)`;
                  const insertSubcategoryData=[product_id,productData.subcategory]
                  await queryAsync(insertSubcategoryQuery,insertSubcategoryData)
                }

                db.commit((err) => {
                    if (err) {
                      db.rollback(() => {
                        throw err;
                      });
                    }
                    //return res.json(product)
                    return res.redirect('/dashboard/productList'); // Redirect to the desired URL
                  });

            }catch(e){
                db.rollback(() => {
                    throw e;
                  });
            }
        })

        
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}

// get edit product page 
exports.getProductEditPage=async(req,res,next)=>{
  let getCategory='SELECT * FROM categories'
  let product_id=req.params.id
  try{
    let categories= await queryAsyncWithoutValue(getCategory)
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
                          LEFT JOIN categories c ON pc.category_id = c.id
                          WHERE p.id=?
                          `;


        
        let data=await queryAsync(allProductsQuery,product_id)
        const nestedData = {};

        data.forEach((product) => {
          const { id,image_id, image, is_featured,video_id, video,cat_id, category_name,subCat_id, subcategory_name, ...productData } = product;

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

        const product = Object.values(nestedData)[0];
        //return res.json(product)
    
      return res.render('admin/product/editProduct',{title:'Edit Product',categories,product})
  }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
  }
}


exports.postProductEditPage=async(req,res,next)=>{
  try{
        const product_id=req.params.id
        const productData = req.body; // Product information from req.body
        const productImages = req.files['product-image']?req.files['product-image']:null; // Array of images
        const productFeatureImage=req.files['product-featured-image']?req.files['product-featured-image']:null
        const productVideo = req.files['video'] ? req.files['video'][0] : null;

        // console.log(productData)
        // console.log(productImages)
        // console.log(productVideo)
        // console.log(req.files)
        // return

        const updateProductQuery = `UPDATE products 
                           SET product_name = ?, 
                               product_model = ?, 
                               unit = ?, 
                               fob_price = ?, 
                               min_order_quentity = ?, 
                               suppy_ability = ?, 
                               processing_time = ?, 
                               packaging_details = ?, 
                               product_details = ? 
                           WHERE id = ?`;

                           const values = [
                            productData.product_name,
                            productData.product_model,
                            productData.unit,
                            productData.fob_price,
                            productData.min_order_quentity,
                            productData.suppy_ability,
                            productData.processing_time,
                            productData.packaging_details,
                            productData.product_details,
                            product_id
                        ];

                        db.beginTransaction(async(err)=>{
                            if(err){
                              throw err 
                            }

                            try{
                              const updateProduct=await queryAsync(updateProductQuery,values)

                              if(productFeatureImage){
                                const updateFeatureImageQuery = `UPDATE product_images 
                                 SET image = ?, 
                                     featured_image = ? 
                                 WHERE product_id = ? 
                                 AND featured_image = true`;

  
                                   let featureImagePath =`/uploads/${productFeatureImage[0].filename}`
                                   const featureImageData=[featureImagePath,true,product_id];
                                   await queryAsync(updateFeatureImageQuery,featureImageData)
                              }
  
                              if(productImages){
                                const insertOtherImagesQuery = `INSERT INTO product_images (product_id, image, featured_image) VALUES (?, ?, ?)`;
                                for (let i = 0; i < productImages.length; i++) {
                                    const image = productImages[i];
                                    let otherImageData=[product_id, `/uploads/${image.filename}`, false];
                                    await queryAsync(insertOtherImagesQuery, otherImageData);
                                }
                              }
  
                              if (productVideo) {
                                let getProductVideQuery='SELECT * FROM product_video WHERE product_id =?'
                                let proVideo=await queryAsync(getProductVideQuery,product_id)
                                console.log(proVideo)
                                if(proVideo.length>0){
                                  const updateVideoQuery = `UPDATE product_video SET video = ? WHERE product_id = ?`;
                                  await queryAsync(updateVideoQuery, [`/uploads/${productVideo.filename}`, product_id]);
                                }else{
                                  const insertVideoQuery = `INSERT INTO product_video (product_id, video) VALUES (?, ?)`;
                                  await queryAsync(insertVideoQuery, [product_id,`/uploads/${productVideo.filename}`]);

                                }
                                
                              }
  
                              const updateCategoryQuery = `UPDATE product_category SET category_id = ? WHERE product_id = ?`;
                              const updateCategoryData=[productData.category,product_id];
                              await queryAsync(updateCategoryQuery,updateCategoryData)
  
                              if(productData.subcategory){
                                const updateSubCategoryQuery = `UPDATE product_sub_category SET sub_category_id = ? WHERE product_id = ?`;
                                const updateSubcategoryData=[productData.subcategory,product_id]
                                await queryAsync(updateSubCategoryQuery,updateSubcategoryData)
                              }
  
                              db.commit((err) => {
                                if (err) {
                                  db.rollback(() => {
                                    throw err;
                                  });
                                }
                                //return res.json(product)
                                return res.redirect('/dashboard/productList'); // Redirect to the desired URL
                              });
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

  