const db=require('../../config/database')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

exports.getLogin=async(req,res,next)=>{
    try{
        
        return res.status(200).render('admin/login')
    }catch(e){
        return res.status(500).json({msg:'Error'})
    }
}


exports.postLogin=async(req,res,next)=>{
    try{
        const { username, password } = req.body;

        db.query('SELECT * FROM admin WHERE username = ?', username, (err, result) => {
          if (err) throw err;
          if (result.length === 0) {
            return res.status(401).redirect('/dashboard/login')
          }
      
          const user = result[0];
      
          const isMatch = bcrypt.compare(password, user.password)
            if (!isMatch) {
              return res.status(401).redirect('/dashboard/login')
            }
      
            // User authenticated, create a JWT
            const token = jwt.sign({ userId: user.id }, "admin_login_secret", { expiresIn: '1h' });
            res.cookie('token', token, { httpOnly: true});
            return res.redirect('/dashboard');
           
          });
        
    }catch(e){
        return res.status(500).json({msg:'Error'})
    }
}


// registration

exports.registration=async(req,res,next)=>{
    try{
        let {username,password}=req.body
        
        password=await bcrypt.hash(password,10)
        
        let insertAdmin=`INSERT INTO admin(username,password)VALUES(?,?)`
        let values=[username,password]
        console.log(values)

        db.query(insertAdmin,values,(err,result)=>{
            if(err){
                throw err
            }
            return res.json("registration success")
        })
    }catch(e){
        return res.status(500).json({msg:'Internal Server Error'})
    }
}


// log out 

exports.logOut=async(req,res,next)=>{
    try{
        // Clear the 'token' cookie
    res.clearCookie('token');
    console.log("delete")
    console.log(res.cookies)

    // Destroy the session
    req.session.destroy((err) => {
        
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal Server Error' });
      }

      return res.redirect('/dashboard/login');
    });
        
    
    }catch(e){
        console.log(e)
        return res.status(500).json({msg:'Internal Server Error'})

    }
}