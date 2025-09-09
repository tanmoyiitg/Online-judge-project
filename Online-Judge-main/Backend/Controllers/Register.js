const express=require('express')
const app=express();
Port=3000
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const cookie=require('cookie-parser')
const User=require('../models/User.js');
const { default: mongoose } = require('mongoose');
const dotenv=require('dotenv')
dotenv.config()
const UserRoles = require('./UserRoles.json')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

function isValidEmail(email){
    return validator.isEmail(email);
}

function isValidPassword(password) {
    // Define validation criteria
    const minLength = 10;
    const minLowercase = 1;
    const minUppercase = 1;
    const minDigits = 1;
    const minSpecialChars = 1;
    // Check length
    if (password.length < minLength) {
        return false;
    }

    // Check character types
    const lowercaseRegex = /[a-z]/g;
    const uppercaseRegex = /[A-Z]/g;
    const digitRegex = /[0-9]/g;
    const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\\/\-]/g;

    if (!password.match(lowercaseRegex) || (password.match(lowercaseRegex) || []).length < minLowercase) {
        return false;
    }

    if (!password.match(uppercaseRegex) || (password.match(uppercaseRegex) || []).length < minUppercase) {
        return false;
    }

    if (!password.match(digitRegex) || (password.match(digitRegex) || []).length < minDigits) {
        return false;
    }

    if (!password.match(specialCharRegex) || (password.match(specialCharRegex) || []).length < minSpecialChars) {
        return false;
    }

    // If all checks pass, the password is considered valid
    return true;
}


 const Register = async (req,res)=>{
    try{
        // get all the data from request.body
        const{firstName,lastName,email,password}=req.body
        
        // check all the sections are filled or not
        if(!(firstName && lastName && email && password)){
            return res.status(400).send("All the fields are required")
        }

        //check valid email
        if(!isValidEmail(email)){
            return res.status(400).json({
                message:"Format is incorrect",
                success:false
            
            });
        }

        // check valid password

        if(!isValidPassword(password)){
            console.log('Invaid Password');
            return res.status(400).send("Must be 10 characters or more, needs at least one number, one UpperCase letter, one LowerCase letter and one special character");
        }
        // check whether user already exist
        const existingUser=await User.findOne({email})
        if(existingUser){
            console.log('Invaid User');
            return res.status(400).send("User already exists")
        }

        // encrypt the password
        const hashPassword = await bcrypt.hashSync(password, 10);

        // Store the User details and encrypted Password in database
        const newUser=await User.create({
            firstName,
            lastName,
            email,
            password:hashPassword
        })

        let roles
        const foundUser = UserRoles.find(person => person.username === email)
        if(foundUser){
            roles=Object.values(foundUser.roles)
        }
        else{
            roles=[2001]
        }

        // Generate a JWT token and store it in Browser's cookie
        const token=jwt.sign({id:newUser._id,email,roles},process.env.SECRET_KEY,{
            expiresIn:"1d"
        })

        // newUser.token=token
        newUser.password=undefined

        // res.status(201).json({
        //     message:"You have successfully registered",
        //     newUser
        // })

        res.status(201).cookie("token",token,{
            expires : new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        }).json({
            message:"You have successfully registered",
            success : true,
            newUser,
            token,
            roles
        })


    }catch(error){
        console.log(error)
    }
}

module.exports=Register