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

const LogIn = async (req,res) =>{
    try {
        const{email,password}=req.body
        if(!(email && password)){
            return res.status(401).send("All fields are required")
        }

        if(!isValidEmail(email)){
            return res.status(400).send("Format is incorrect");
        }

        const userExists=await User.findOne({email})
        if(!userExists){
            return res.status(400).send("User doesn't exist")
        }

        const validPassword=await bcrypt.compare(password, userExists.password);

        if(!validPassword){
            return res.status(400).send("Password is incorrect")
        }

        userExists.password=undefined
        userExists.code=undefined
        let roles
        const foundUser = UserRoles.find(person => person.username === email)
        if(foundUser){
            roles=Object.values(foundUser.roles)
        }
        else{
            roles=[2001]
        }

        const token=jwt.sign({id:userExists._id,email,roles},process.env.SECRET_KEY,{
            expiresIn : "1d"
        })

        res.status(201).cookie("token",token,{
            expires : new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        }).json({
            message:"You have successfully Logged in",
            success : true,
            userExists,
            token,
            roles
        })
    }catch (error) {
        console.log(error);
    }
    
}

module.exports=LogIn