const router=require('express').Router()
const {getLogin,postLogin,registration,logOut}=require('../../controller/admin/authController')
const {getDashboard}=require('../../controller/admin/dashboardController')
const {getManagingDirector,updateManagingDirector,getTeamExperts,getAddTeamExpert,postTeamExpert,updateSingleTeam,deleteTeamExpert,getSingleTeam}=require('../../controller/admin/teamController')
const {getTestimonial,getAddTastimonial,postTestimonial,deleteTestimonial,getSingleTestimonail,updateTestimonial} =require('../../controller/admin/testimonialController')
const {getCountry,getAddCountry,postCountry,deleteCountry,getSingleCountry,updateCountry}=require('../../controller/admin/countryController')
const {getHomePageBanner,updateHomeBanner}=require('../../controller/admin/homePageBannerController')
const {getFooterInfo,updateFooterInfo}=require('../../controller/admin/footerController')
const {getBasicInfo,updateBasicInfo}=require('../../controller/admin/basicInfoController')
const {getProfile,updateAdmin}=require('../../controller/admin/profileController')
const {getContactMessage,deleteContactMessage,getEnquiry,deleteEnquiry}=require('../../controller/admin/contactMessage&EnquiryController')
const {getCategory,getAddCategory,postCategory,getEditCategory,editCategory,deleteCategory,deleteSubCategory}=require('../../controller/admin/categoryController')
const {getProductList,getAddProduct,postAddProduct,getProductEditPage,postProductEditPage}=require('../../controller/admin/productController')
const {getCertification,getAddCertification,postCertification,deleteCertification,getSingleCertification,updateCertification}=require('../../controller/admin/certificationController')



const upload=require('../../middleware/uploadMiddleware')
const multiUpload=require('../../middleware/multiupload')
const adminAuth=require('../../middleware/authMiddlerare')


// auth 
router.get('/login',getLogin)
router.post('/login',postLogin)
router.post('/registration',registration)
router.get('/logout',adminAuth,logOut)



router.get('/',adminAuth,getDashboard)



// profile
router.get('/profile',adminAuth,getProfile)
router.post('/editProfile/:id',upload.single('admin-image'),updateAdmin)




// team expert and Managing Director
router.get('/managingDirector',adminAuth,getManagingDirector)
router.post('/updateManagingDirector/:id',adminAuth,upload.single('md-image'),updateManagingDirector)
router.get('/teamExpert',adminAuth,getTeamExperts)
router.get('/addTeamExpert',adminAuth,getAddTeamExpert)
router.post('/addTeamExpert',adminAuth,upload.single('expert-image'),postTeamExpert)
router.post('/updateTeamSingle/:id',adminAuth,upload.single('expert-image'),updateSingleTeam)
router.get('/deleteTeamSingle/:id',adminAuth,deleteTeamExpert)
router.get('/teamSingle/:id',adminAuth,getSingleTeam)

// testimonial
router.get('/testimonial',adminAuth,getTestimonial)
router.get('/testimonial/:id',adminAuth,getSingleTestimonail)
router.get('/addTestimonial',adminAuth,getAddTastimonial)
router.post('/addTestimonial',adminAuth,upload.single('testimonial-image'),postTestimonial)
router.get('/deleteTestimonial/:id',adminAuth,deleteTestimonial)
router.post('/updateTestimonial/:id',adminAuth,upload.single('testimonial-image'),updateTestimonial)



// country
router.get('/country',adminAuth,getCountry)
router.get('/addCountry',adminAuth,getAddCountry)
router.post('/addCountry',adminAuth,upload.single('country-image'),postCountry)
router.get('/deleteCountry/:id',adminAuth,deleteCountry)
router.get('/country/:id',adminAuth,getSingleCountry)
router.post('/updateCountry/:id',adminAuth,upload.single('country-image'),updateCountry)


// homeBanner
router.get('/homeBanner',adminAuth,getHomePageBanner)
router.post('/updateHomeBanner/:id',adminAuth,upload.fields([{ name: 'hero_image' }, { name: 'logo1_image' },{name:'logo2_image'}]),updateHomeBanner)




// footer info
router.get('/footerInformation',adminAuth,getFooterInfo)
router.post('/footerInformation/:id/:id1',adminAuth,updateFooterInfo)

// basic info 
router.get('/basicInformation',adminAuth,getBasicInfo)
router.post('/updateBasicInformation/:id',adminAuth,updateBasicInfo)




// contact & enquiry messages
router.get('/contactMessages',adminAuth,getContactMessage)
router.get('/deleteMessage/:id',adminAuth,deleteContactMessage)
router.get('/enquiry',adminAuth,getEnquiry)
router.get('/deleteEnquiry/:id',adminAuth,deleteEnquiry)




//category routes 
router.get('/category',adminAuth,getCategory)
router.get('/addCategory',adminAuth,getAddCategory)
router.post('/addCategory',adminAuth,postCategory)
router.get('/editCategory/:id',adminAuth,getEditCategory)
router.post('/editCategory/:id',adminAuth,editCategory)
router.get('/category/delete/:id',adminAuth,deleteCategory)
router.get('/subCategory/delete/:id',adminAuth,deleteSubCategory)



// product  routes 
router.get('/productList',adminAuth,getProductList)
router.get('/addProduct',adminAuth,getAddProduct)
router.post('/addProduct',adminAuth,multiUpload.fields([{name:'product-featured-image'},{ name: 'product-image'}, { name: 'video'}]),postAddProduct)
router.get('/editProduct/:id',adminAuth,getProductEditPage)
router.post('/editProduct/:id',adminAuth,multiUpload.fields([{name:'product-featured-image'},{ name: 'product-image'}, { name: 'video'}]),postProductEditPage)


// certification
router.get('/certification',adminAuth,getCertification)
router.get('/addCertification',adminAuth,getAddCertification)
router.post('/addCertification',adminAuth,upload.single('certification'),postCertification)
router.get('/deleteCertification/:id',adminAuth,deleteCertification)
router.get('/certification/:id',adminAuth,getSingleCertification)
router.post('/updateCertification/:id',adminAuth,upload.single('certification'),updateCertification)

module.exports=router