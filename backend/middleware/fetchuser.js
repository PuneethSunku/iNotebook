var jwt = require('jsonwebtoken');
const JWT_SECRET ='Puneethisagoodboy';

//it will fetch all the details of the user and append those details to req
const fetchuser = ( req, res, next )=>{
    //Get the user from the jwt token and add id to req object
    const token = req.header('auth-token'); //U need to keep this in thunder client header
    if(!token){res.status(401).send({error: "Please Authenticate using a valid token"});}   //401 is used for access denied
    
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        next();  //This is used to call next function after this  which is async(req,res) in ROUTE 3
    } catch (error) {
        res.status(401).send({error: "Please Authenticate using a valid token"});
    }
}



module.exports = fetchuser;