const router=require('express').Router()
const {getSubCategoriesByCategory,deleteProductImage,deleteProductVideo,deleteProduct}=require('../controller/apiController')
const adminAuth=require('../../../middleware/authMiddlerare')

router.get('/getSubCategoryByCategoryId/:categoryId',adminAuth,getSubCategoriesByCategory)
router.get('/deleteProductImage/:id',adminAuth,deleteProductImage)
router.get('/deleteProductVideo/:id',adminAuth,deleteProductVideo)
router.delete('/deleteProduct/:id',deleteProduct)

module.exports=router 