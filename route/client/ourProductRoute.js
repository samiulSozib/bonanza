const router=require('express').Router()
const {getOurProduct,getProductDetails}=require('../../controller/client/ourProductController')



router.get('/',getOurProduct)
router.get('/details/:id',getProductDetails)


module.exports=router