const express = require('express')
const User = require('../models/User');
const router =  express.Router();
const { body , validationResult} = require('express-validator'); //To validate details
var bcrypt = require('bcryptjs'); //TO hash the password
var fetchuser = require('../middleware/fetchuser');
var jwt = require('jsonwebtoken');

const JWT_SECRET ='Puneethisagoodboy'; //A decoded JWT(Json web token) has header(algorithm& token type) ,Payload(data) , signature

//ROUTE 1: Create a User using: POST "/api/auth/createuser" . No login required
router.post('/createuser',
[ 
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
] , async (req,res)=>{

    let success =false;

    //If there are any errors while validating input
    const errors = validationResult(req); //This will check is there any validation errors
    if (!errors.isEmpty()) { 
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        //Check whether the user with this email exists already
        let user = await User.findOne({email: req.body.email}); 
        if(user){ success = false ; return res.status(400).json({ success, error: 'User with this email Id already exist'});} //If user already exist
        const salt = await bcrypt.genSalt(10); //To generate salt
        const securedPassword = await bcrypt.hash( req.body.password,salt)
        //Create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securedPassword
        })
        //   .then(user=>res.json(user))
        //   .catch(err=>{ console.log(err) 
        //     res.json({error: 'Email Id already exist' , message: err.message})})

        const data ={
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET); //We are signing and giving token to a user till their session ends they can use this.
        success = true; 
        //res.json(user);
        res.json({success, authToken});
    }catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

    // try {
    //     const { name, email, password } = req.body;
    //     const user = new User({ name, email, password });
    //     await user.save();
    //     res.status(201).send(user);
    //   } catch (error) {
    //     console.error(error);
    //     res.status(500).send('Internal Server Error');
    //   }
})

//ROUTE 2: Authenticate a User using: POST "/api/auth/login" . No login required
router.post('/login',
[ 
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').exists().withMessage('Password cannot be blank'),
    
] , async (req,res)=>{

    let success =false; 
    
    const errors = validationResult(req); //This will check is there any validation errors
    if (!errors.isEmpty()) { 
        return res.status(400).json({ errors: errors.array() });
    }
    const {email , password } =req.body;
    try{
        let user = await User.findOne({email: email});
        if(!user){ success=false ; return res.status(400).json({ success, error: 'User with this email Id doesnot exist'});} //For security purposes we wont tell what is wrong we just give error like enter valid credentials

        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){ success=false ; return res.status(400).json({ success , error: 'Incorrect Password'});}
        
        const data ={
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);//To sign 
        success =true;
        res.json({success ,authToken});

    }catch(error){
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

//ROUTE 3: Get Logged in User Details using: POST "/api/auth/getuser" . No login required

router.post('/getuser', fetchuser , async (req,res)=>{
    try {
        const userId = req.user.id ;
        const user = await User.findById(userId).select("-password") //Here we write -(minus) bcoz we need all details except password
        res.send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})


//Middleware is used if any request comes to that function who are logged in equally 
module.exports = router