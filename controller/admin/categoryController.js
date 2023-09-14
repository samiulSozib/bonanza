const db=require('../../config/database')
const helper=require('../../config/helper')

// get Categories
exports.getCategory=async(req,res,next)=>{
    try{
      let q='SELECT c.id AS category_id, c.category_name AS category_name, s.id AS subcategory_id, s.subcategory_name AS subcategory_name FROM categories c LEFT JOIN sub_categories s ON c.id = s.category_id;'
      db.query(q,(err,result)=>{
        if(err){
          throw err
        }
        const nestedData = {};

        result.forEach((row) => {
          const { category_id, category_name, subcategory_id, subcategory_name } = row;
      
          if (!nestedData[category_id]) {
            nestedData[category_id] = {
              category_id,
              category_name,
              subcategories: [],
            };
          }
      
          if (subcategory_id) {
            nestedData[category_id].subcategories.push({
              subcategory_id,
              subcategory_name,
            });
          }
        });
        const categories = Object.values(nestedData);

        return res.status(200).render('admin/product/category',{title:"Categories",nav:"category",categories})
        return res.json(nestedData)
      })
     
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}


// add product Categories

exports.getAddCategory=async(req,res,next)=>{
    try{
      const categories=await helper.fetchCategories()
        return res.status(200).render('admin/product/addCategory',{title:"Product Categories",nav:"product",categories})
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}


// post Category and subCatgegory
exports.postCategory = async (req, res, next) => {
  try {
    const { categoryName, subCategory } = req.body;
    console.log(categoryName, subCategory);

    const categoryQuery = 'INSERT INTO categories (category_name) VALUES (?)';
    const categoryValues = [categoryName];

    const subCategoryQuery = 'INSERT INTO sub_categories (subcategory_name, category_id) VALUES (?, ?)';
     // The `null` will be replaced with the actual category_id
    if (!subCategory) {
      // If no subcategories, directly insert the category and return the response
      db.query(categoryQuery, categoryValues, (err, categoryResult) => {
        if (err) {
          console.error('Error saving category:', err);
          return res.status(500).json({ message: 'Error saving category' });
        }
        return res.redirect('/dashboard/category'); // Redirect to the desired URL
      });
    } else {
      const subCategoryValues = subCategory.map((subCate) => [subCate, null]);
      // If there are subcategories, start a transaction
      db.beginTransaction(async (err) => {
        if (err) {
          throw err;
        }

        try {
          const categoryResult = await queryAsync(categoryQuery, categoryValues);
          const categoryId = categoryResult.insertId;

          for (const subCateValue of subCategoryValues) {
            subCateValue[1] = categoryId;
            await queryAsync(subCategoryQuery, subCateValue);
          }

          db.commit((err) => {
            if (err) {
              db.rollback(() => {
                throw err;
              });
            }
            return res.redirect('/dashboard/category'); // Redirect to the desired URL
          });
        } catch (e) {
          db.rollback(() => {
            throw e;
          });
        }
      });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'An error occurred' });
  }
};


// get edit categories page 
exports.getEditCategory=async(req,res,next)=>{
    let category_id=req.params.id
    console.log(category_id)
    const categories=await helper.fetchCategories()
    let findCategoryQuery='SELECT c.id AS category_id, c.category_name AS category_name, s.id AS subcategory_id, s.subcategory_name AS subcategory_name FROM categories c LEFT JOIN sub_categories s ON c.id = s.category_id WHERE c.id=?;'
    
    try{
       const _category=await queryAsync(findCategoryQuery,category_id);
       const nestedData = {};

       _category.forEach((item) => {
        const { category_id, category_name, subcategory_id, subcategory_name } = item;

        if (!nestedData[category_id]) {
            nestedData[category_id] = {
            category_id,
            category_name,
            subcategories: []
            };
        }

        nestedData[category_id].subcategories.push({
            subcategory_id,
            subcategory_name
        });
        });

        const category = Object.values(nestedData);
        //return res.json(category)
        return res.status(200).render('admin/product/editCategory',{title:'Edit Category',nav:"product",category,categories})
    }catch(e){
        console.error(e);
        return res.status(500).json({ message: 'An error occurred' });
    }
}

// edit category

// Assuming you have defined the required database connection and queryAsync function

exports.editCategory = async (req, res, next) => {
    try {
      const categoryId = req.params.id;
      const { categoryName, subCategory } = req.body;
      console.log(categoryId, categoryName, subCategory);
  
      const categoryQuery = 'UPDATE categories SET category_name = ? WHERE id = ?';
      const categoryValues = [categoryName, categoryId];
  
      const subCategoryDeleteQuery = 'DELETE FROM sub_categories WHERE category_id = ?';
      const subCategoryValues = [categoryId];
  
      // Start a transaction to update both category and subcategories
      db.beginTransaction(async (err) => {
        if (err) {
          throw err;
        }
  
        try {
          // Update the category name
          await queryAsync(categoryQuery, categoryValues);
  
          // Delete existing subcategories for the category
          await queryAsync(subCategoryDeleteQuery, subCategoryValues);
  
          // Insert the new subcategories if provided
          if (subCategory && subCategory.length > 0) {
            const subCategoryQuery = 'INSERT INTO sub_categories (subcategory_name, category_id) VALUES (?, ?)';
            const subCategoryInsertValues = subCategory.map((subCate) => [subCate, categoryId]);
            for (const subCateValue of subCategoryInsertValues) {
              await queryAsync(subCategoryQuery, subCateValue);
            }
          }
  
          db.commit((err) => {
            if (err) {
              db.rollback(() => {
                throw err;
              });
            }
            return res.redirect('/dashboard/category'); // Redirect to the desired URL
          });
        } catch (e) {
          db.rollback(() => {
            throw e;
          });
        }
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: 'An error occurred' });
    }
  };
  

// delete category with subcategories

// Assuming you have required dependencies and database connection

// Delete category and its subcategories
exports.deleteCategory = async (req, res, next) => {
    try {
      const categoryId = req.params.id;
      
      // Start a transaction to ensure consistent data removal
      db.beginTransaction(async (err) => {
        if (err) {
          throw err;
        }
  
        try {
          // First, delete the subcategories associated with the category
          const deleteSubcategoriesQuery = 'DELETE FROM sub_categories WHERE category_id = ?';
          await queryAsync(deleteSubcategoriesQuery, [categoryId]);
  
          // Next, delete the category
          const deleteCategoryQuery = 'DELETE FROM categories WHERE id = ?';
          await queryAsync(deleteCategoryQuery, [categoryId]);
  
          db.commit((err) => {
            if (err) {
              db.rollback(() => {
                throw err;
              });
            }
            return res.redirect('/dashboard/category'); 
          });
        } catch (e) {
          db.rollback(() => {
            throw e;
          });
        }
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ message: 'An error occurred' });
    }
  };

  // Delete  subcategories
exports.deleteSubCategory = async (req, res, next) => {
  try {
    const subCategoryId = req.params.id;
    
    // Start a transaction to ensure consistent data removal
    db.beginTransaction(async (err) => {
      if (err) {
        throw err;
      }

      try {
        // First, delete the subcategories associated with the category
        const deleteSubcategoriesQuery = 'DELETE FROM sub_categories WHERE id = ?';
        await queryAsync(deleteSubcategoriesQuery, [subCategoryId]);

        // Next, delete the category
       

        db.commit((err) => {
          if (err) {
            db.rollback(() => {
              throw err;
            });
          }
          return res.redirect('/dashboard/category'); 
        });
      } catch (e) {
        db.rollback(() => {
          throw e;
        });
      }
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'An error occurred' });
  }
};
  


// Helper function to wrap db.query in a promise
function queryAsync(query, values) {
  return new Promise((resolve, reject) => {
    db.query(query, values, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}
