const router=require('express').Router()
const {getOurProduct}=require('../../controller/client/ourProductController')


router.get('/',getOurProduct)



module.exports=router