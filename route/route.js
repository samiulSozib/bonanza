const homeRoute=require('./client/homeRoute')
const aboutRoute=require('./client/aboutRoute')
const ourProductRoute=require('./client/ourProductRoute')
const productDetailsRoute=require('./client/productDetailsRoute')
const ourTeamRoute=require('./client/ourTeamRoute')
const contactRoute=require('./client/contactRoute')
const enquiryRoute=require('./client/enquiryRoute')
const factoryRoute=require('./client/factoryRoute')
const dashboardRoute=require('./admin/dashboardRoute')



const routes = [
    {
        path:'/aboutUs',
        handler:aboutRoute
    },
    {
        path:'/ourProduct',
        handler:ourProductRoute
    },
    {
        path:'/productDetails',
        handler:productDetailsRoute
    },
    {
        path:'/ourTeam',
        handler:ourTeamRoute
    },
    {
        path:'/contactUs',
        handler:contactRoute
    },
    {
        path:'/enquiry',
        handler:enquiryRoute
    },
    {
        path:'/factory',
        handler:factoryRoute
    },
    {
        path:'/dashboard',
        handler:dashboardRoute
    },
   
    {
        path: '/',
        handler: homeRoute
    },
   
]

module.exports = (app) => {
    routes.forEach(r => {
        if (r.path == '/') {
            app.get(r.path, r.handler)
        } else {
            app.use(r.path, r.handler)
        }
    })
}