const db=require('../../config/database')
const helper=require('../../config/helper')

exports.getBasicInfo=async(req,res,next)=>{
    try{
        let getBasicInfoQuery='SELECT * FROM basic_information'
        const categories=await helper.fetchCategories()
        db.query(getBasicInfoQuery,(err,basicInfo)=>{
            if(err){
                throw err 
            }
           
            return res.status(200).render('admin/generalInfo/basicInfo',{title:"Basic Info",categories,nav:"generalInfo",basicInfo})
        })
        
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}


// update Information

exports.updateBasicInfo=async(req,res,next)=>{
    try{
        let id=req.params.id
        let {importRate,exportRate,productionRate,employeesCount,officeCount,projectCount,customerCount,responseRate,responseTime,quotationPerformance,videoHomePage,videoProductPage}=req.body
        let updateQuery = 'UPDATE basic_information SET importRate = ?, exportRate = ?, productionRate = ?, employeesCount = ?, officeCount = ?,projectCount = ?, customerCount = ?, responseRate = ?, responseTime = ?, quotationPerformance = ?,videoHomePage=?,videoProductPage=? WHERE id = ?';
        let value=[importRate,exportRate,productionRate,employeesCount,officeCount,projectCount,customerCount,responseRate,responseTime,quotationPerformance,videoHomePage,videoProductPage,id]
        

        
        db.query(updateQuery,value,(err,result)=>{
            if(err){
                throw err 
            }
            return res.redirect('/dashboard/basicInformation')
        })
       

    }catch(e){
        return res.status(500).json({msg:'Internal Server Error'})
    }
}