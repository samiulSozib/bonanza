const router=require('express').Router()
const {getContact}=require('../../controller/client/contactController')


router.get('/',getContact)

module.exports=router