const router=require('express').Router()
const {getEnquiry}=require('../../controller/client/enquiryController')


router.get('/',getEnquiry)

module.exports=router