const router=require("express").Router()
const {addContact,addEnquiry}=require("../controller/apiController")


// send message from contact 
router.post('/addContact',addContact)


// send enquiry
router.post('/addEnquiry',addEnquiry)


module.exports=router