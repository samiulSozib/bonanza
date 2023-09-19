const db=require('../../config/database')
const helper=require('../../config/helper')

exports.getQuestionAnswer=async(req,res,next)=>{
    try{
        const question_answer_query=`SELECT * FROM frequently_question`;

        let question_answer=await queryAsyncWithoutValue(question_answer_query)
        const categories=await helper.fetchCategories()
 
        return res.status(200).render('admin/generalInfo/questionAnswer',{title:"Question & Answer",categories,nav:"generalInfo",question_answer})
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}

exports.getUpdateQuestionAnswer=async(req,res,next)=>{
    try{
        let id=req.params.question_id
        const question_answer_query=`SELECT * FROM frequently_question WHERE id= ?`;

        let question_answer=await queryAsync(question_answer_query,[id])
        const categories=await helper.fetchCategories()
 
        return res.status(200).render('admin/generalInfo/updateQuestionAnswer',{title:"Question & Answer",categories,nav:"generalInfo",question_answer:question_answer[0]})
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}

exports.getAddQuestionAnswer=async(req,res,next)=>{
    try{
        const categories=await helper.fetchCategories()
        return res.status(200).render('admin/generalInfo/addQuestionAnswer',{title:"Question & Answer",categories,nav:"generalInfo"})
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}

exports.postAddQuestionAnswer=async(req,res,next)=>{
    try{
        let {question,answer}=req.body
        const question_answer_query=`INSERT INTO frequently_question (question,answer) values (?,?)`;


        await queryAsync(question_answer_query,[question,answer])
 
        return res.status(200).redirect('/dashboard/question-answer')
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}


exports.postUpdateQuestionAnswer=async(req,res,next)=>{
    try{
        let id=req.params.question_id
        let {question,answer}=req.body
        const question_answer_update_query=`UPDATE frequently_question SET question=?, answer=? WHERE id= ?`;

        let question_answer=await queryAsync(question_answer_update_query,[question,answer,id])
 
        return res.status(200).redirect('/dashboard/question-answer')
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}

exports.deleteQuestionAnswer=async(req,res,next)=>{
    try{
        let id=req.params.question_id
        const question_answer_query=`DELETE FROM frequently_question WHERE id= ?`;

        await queryAsync(question_answer_query,[id])
        
 
        return res.status(200).redirect('/dashboard/question-answer')
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})
    }
}

// Helper function to wrap db.query in a promise
function queryAsync(query, values) {
    return new Promise((resolve, reject) => {
      db.query(query, values, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
  function queryAsyncWithoutValue(query) {
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }