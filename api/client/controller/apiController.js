const db=require('../../../config/database')


// send message from contact form
exports.addContact=async(req,res,next)=>{
    try{
        const {name,email,phoneNumber,category,message}=req.body
        const query = 'INSERT INTO contacts (name, email, phoneNumber, category, message) VALUES (?, ?, ?, ?, ?)';
        const values = [name, email, phoneNumber, category, message];

        db.query(query, values, (error, results) => {
            if (error) {
              console.log(error)
              return res.status(400).json({msg:'Message Send Fail'})
            }
          //   wbm.start().then(async () => {
          //     const phones = ['+8801798778978'];
          //     const message = 'Good Morning.';
          //     await wbm.send(phones, message);
          //     await wbm.end();
          // }).catch(err => console.log(err));
            return res.status(201).json({msg:'Message Sent Success'})
          });
        
    }catch(e){
        return res.status(500).json({msg:'Server Error'})
    }
}


// send enquiry form enquiry form 
exports.addEnquiry=async(req,res,next)=>{
  try{
    const {name,phoneNumber,email,subject,enquiry}=req.body
    const query = 'INSERT INTO enquiry (name, phoneNumber, email, subject, enquiry) VALUES (?, ?, ?, ?, ?)';
    const values = [name, phoneNumber, email, subject, enquiry];

    db.query(query, values, (error, results) => {
        if (error) {
          console.log(error)
          return res.status(400).json({msg:'Enquiry Send Fail'})
        }
        return res.status(201).json({msg:'Enquiry Sent Success'})
      });
  }catch(e){
    return res.status(500).json({msg:'Server Error'})
  }
}



// get contact information
exports.getContactInformation=async(req,res,next)=>{
  try{
    const query='SELECT * FROM contact_information';
    db.query(query,(error,contactInformation)=>{
      if(error){
        return res.status(400).json({msg:'Error'})
      }
      return res.status(200).json(contactInformation)
    })
  }catch(e){
    return res.status(500).json({msg:'Server Error'})
  }
}


exports.getOurProduct=async(req,res,next)=>{
  try{
      const findBasicInformation='SELECT * FROM basic_information'
      db.beginTransaction(async(err)=>{
          if(err){
              throw err 
          }

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


              db.commit((err)=>{
                  if(err){
                      db.rollback(()=>{
                          throw err 
                      })
                  }
                  return res.json(allProducts)
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
