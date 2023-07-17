const router=require('express').Router()
const {getDashboard}=require('../../controller/admin/dashboardController')
const {getProductList,getAddProduct,getProductCategory}=require('../../controller/admin/productController')
const {getManagingDirector,updateManagingDirector,getTeamExperts,getAddTeamExpert,postTeamExpert,updateSingleTeam,deleteTeamExpert,getSingleTeam}=require('../../controller/admin/teamController')
const {getTestimonial,getAddTastimonial,postTestimonial,deleteTestimonial,getSingleTestimonail,updateTestimonial} =require('../../controller/admin/testimonialController')
const {getAddContry}=require('../../controller/admin/addCountryController')
const {getHomePageBanner}=require('../../controller/admin/homePageBannerController')
const {getFooterInfo}=require('../../controller/admin/footerController')
const {getProfile}=require('../../controller/admin/profileController')
const upload=require('../../middleware/uploadMiddleware')

router.get('/',getDashboard)


router.get('/profile',getProfile)


router.get('/productList',getProductList)
router.get('/addProduct',getAddProduct)
router.get('/productCategory',getProductCategory)


router.get('/managingDirector',getManagingDirector)
router.post('/updateManagingDirector/:id',upload.single('md-image'),updateManagingDirector)
router.get('/teamExpert',getTeamExperts)
router.get('/addTeamExpert',getAddTeamExpert)
router.post('/addTeamExpert',upload.single('expert-image'),postTeamExpert)
router.post('/updateTeamSingle/:id',upload.single('expert-image'),updateSingleTeam)
router.get('/deleteTeamSingle/:id',deleteTeamExpert)
router.get('/teamSingle/:id',getSingleTeam)

// testimonial
router.get('/testimonial',getTestimonial)
router.get('/testimonial/:id',getSingleTestimonail)
router.get('/addTestimonial',getAddTastimonial)
router.post('/addTestimonial',upload.single('testimonial-image'),postTestimonial)
router.get('/deleteTestimonial/:id',deleteTestimonial)
router.post('/updateTestimonial/:id',upload.single('testimonial-image'),updateTestimonial)



router.get('/addCountry',getAddContry)


router.get('/homeBanner',getHomePageBanner)


router.get('/footerInformation',getFooterInfo)


module.exports=router