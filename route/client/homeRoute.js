const router=require('express').Router()
const {getHomePage}=require('../../controller/client/homeController')


router.get('/',getHomePage)



module.exports=router