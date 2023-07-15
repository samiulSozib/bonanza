const router=require('express').Router()
const {getOurTeam}=require('../../controller/client/oueTeamController')


router.get('/',getOurTeam)

module.exports=router