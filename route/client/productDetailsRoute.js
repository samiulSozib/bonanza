const router=require('express').Router()
const {getProductDetails}=require('../../controller/client/ourProductController')



router.get('/',getProductDetails)


module.exports=router