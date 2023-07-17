const db=require('../../../config/database')


// send message from contact form
exports.addContact=async(req,res,next)=>{
    try{
        const {name,email,phoneNumber,category,message}=req.body
        const query = 'INSERT INTO contacts (name, email, phoneNumber, category, message) VALUES (?, ?, ?, ?, ?)';
        const values = [name, email, phoneNumber, category, message];

        db.query(query, values, (error, results) => {
            if (error) {
              console.log(error)
              return res.status(400).json({msg:'Message Send Fail'})
            }
            return res.status(201).json({msg:'Message Sent Success'})
          });
        
    }catch(e){
        return res.status(500).json({msg:'Server Error'})
    }
}


// send enquiry form enquiry form 
exports.addEnquiry=async(req,res,next)=>{
  try{
    const {name,phoneNumber,email,subject,enquiry}=req.body
    const query = 'INSERT INTO enquiry (name, phoneNumber, email, subject, enquiry) VALUES (?, ?, ?, ?, ?)';
    const values = [name, phoneNumber, email, subject, enquiry];

    db.query(query, values, (error, results) => {
        if (error) {
          console.log(error)
          return res.status(400).json({msg:'Enquiry Send Fail'})
        }
        return res.status(201).json({msg:'Enquiry Sent Success'})
      });
  }catch(e){
    return res.status(500).json({msg:'Server Error'})
  }
}



// get contact information
exports.getContactInformation=async(req,res,next)=>{
  try{
    const query='SELECT * FROM contactInformation';
    db.query(query,(error,contactInformation)=>{
      if(error){
        return res.status(400).json({msg:'Error'})
      }
      return res.status(200).json(contactInformation)
    })
  }catch(e){
    return res.status(500).json({msg:'Server Error'})
  }
}