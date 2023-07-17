const router=require("express").Router()
const {addContact,addEnquiry,getContactInformation}=require("../controller/apiController")


// send message from contact 
router.post('/addContact',addContact)


// send enquiry
router.post('/addEnquiry',addEnquiry)


// get contact information
router.get('/contactInformation',getContactInformation)


module.exports=router