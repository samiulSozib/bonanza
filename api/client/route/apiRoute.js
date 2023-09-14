const router=require("express").Router()
const {addContact,addEnquiry,getContactInformation,getOurProduct,getSocialMedia}=require("../controller/apiController")


// send message from contact 
router.post('/addContact',addContact)


// send enquiry
router.post('/addEnquiry',addEnquiry)


// get contact information
router.get('/contactInformation',getContactInformation)


// get products 
router.get('/products',getOurProduct)


// get social media 
router.get('/socialMedia',getSocialMedia)

module.exports=router