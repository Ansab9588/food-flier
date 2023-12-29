const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');


// Hashing Part
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signing Part
const jwtSecret = "thisisgoingtobein#";



// SignUp End
router.post('/createuser', [

// Usernaname must be an email 
body('email', 'Invalid Email').isEmail(),
body('name'),
// Password must be at least 5 chars
body('password', 'Invalid Password').isLength( {min:5} )],

async (req, res) =>{

    // For SignUp page data vallidation and Schema
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }


    // Hashing Part
    const salt = await bcrypt.genSalt(15);
    let secPass = await bcrypt.hash(req.body.password, salt)

    try {

        // DB Schema
        await User.create({
            name: req.body.name,
            email: req.body.email,
            location: req.body.location,
            // password: req.body.password
            password: secPass
        })

        res.json({success:true});
    } 

    catch (error) {
        console.log(error);
        res.json({success:false});
    }
});



// Login End
router.post('/loginuser',
    
    // Check Data Validation
    body('email', 'Invalid Email').isEmail(),
    body('password', 'Invalid Password').isLength( {min:5} ),

    async (req, res) =>{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
        }

        let email = req.body.email;
    
        try {
    
            // DB Schema
            let checkData = await User.findOne({email});

            if(!checkData){
                return res.status(400).json({errors : "Invalid Credentials, Try Again!"});
            }


            // if(req.body.password !== checkData.password){
            //     return res.status(400).json({errors : "Invalid Password, Try Again!"});
            // }

            const pwdCompare = await bcrypt.compare(req.body.password, checkData.password);

            if(!pwdCompare){
                return res.status(400).json({errors : "Invalid Password, Try Again!"});
            }

            // Signing Part
            const data = {
                user: {
                    id: checkData._id
                }
            }

            const authToken = jwt.sign(data, jwtSecret);

            return res.json({success:true, authToken:authToken});
    
        } 
    
        catch (error) {
            console.log(error);
            res.json({success:false});
        }
    });

module.exports = router;
