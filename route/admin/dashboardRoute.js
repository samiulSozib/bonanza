const router=require('express').Router()
const {getDashboard}=require('../../controller/admin/dashboardController')
const {getProductList,getAddProduct,getProductCategory}=require('../../controller/admin/productController')
const {getTeam,getSingleTeam}=require('../../controller/admin/teamController')
const {getTestimonial} =require('../../controller/admin/testimonialController')
const {getAddContry}=require('../../controller/admin/addCountryController')
const {getHomePageBanner}=require('../../controller/admin/homePageBannerController')
const {getFooterInfo}=require('../../controller/admin/footerController')
const {getProfile}=require('../../controller/admin/profileController')

router.get('/',getDashboard)


router.get('/profile',getProfile)


router.get('/productList',getProductList)
router.get('/addProduct',getAddProduct)
router.get('/productCategory',getProductCategory)


router.get('/team',getTeam)
router.get('/teamSingle',getSingleTeam)


router.get('/testimonial',getTestimonial)


router.get('/addCountry',getAddContry)


router.get('/homeBanner',getHomePageBanner)


router.get('/footerInformation',getFooterInfo)


module.exports=router