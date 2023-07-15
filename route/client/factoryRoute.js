const router=require('express').Router()
const {getFactory}=require('../../controller/client/factoryController')


router.get('/',getFactory)

module.exports=router