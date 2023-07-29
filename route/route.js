const homeRoute=require('./client/homeRoute')
const aboutRoute=require('./client/aboutRoute')
const ourProductRoute=require('./client/ourProductRoute')

const ourTeamRoute=require('./client/ourTeamRoute')
const contactRoute=require('./client/contactRoute')
const enquiryRoute=require('./client/enquiryRoute')
const factoryRoute=require('./client/factoryRoute')
const dashboardRoute=require('./admin/dashboardRoute')
const clientApiRoute=require('../api/client/route/apiRoute')
const adminApiRoute=require('../api/admin/route/apiRoute')



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
        path:'/api/client',
        handler:clientApiRoute
    },
    {
        path:'/api/admin',
        handler:adminApiRoute
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