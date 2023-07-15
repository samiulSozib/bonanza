const router=require('express').Router()
const {getAboutUsPage}=require('../../controller/client/aboutController')


router.get('/',getAboutUsPage)

module.exports=router