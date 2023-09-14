const db=require('./database')


async function fetchCategories() {
    try {
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
                  return categories
    } catch (error) {
        throw new Error('Error fetching '+error);
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


  module.exports={
    fetchCategories
}
