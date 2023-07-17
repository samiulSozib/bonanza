const router=require('express').Router()
const {getOurTeam}=require('../../controller/client/ourTeamController')


router.get('/',getOurTeam)

module.exports=router