const jwt = require("jsonwebtoken");

const adminAuth = async(req, res, next) => {
    const token = req.cookies.token;
        //console.log(token)

        if (!token) {
            return res.redirect('/dashboard/login')
        }
    try {
        

        const verified = jwt.verify(token, "admin_login_secret");
        //console.log(jwt.verify(token,"passwordKey"))
        if (!verified)
            return res.redirect('/dashboard/login')


        req.admin = verified.userId;
        
        
        return next();
    } catch (err) {
        return res.status(500).redirect('/dashboard/login')
    }
};



module.exports = adminAuth;