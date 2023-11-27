const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {
    try {
        const {name, email, password} = req.body;

        // Check if user already exist or not
         const existingUser = await User.findOne({email});

         if(existingUser){
            return res.status(400).send("User already exist");
         }

        //  Hash the password

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({userId: (await user)._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
        res.json({token});

    } catch(err){
        console.error(err);
        res.status(500).send({message: "Internal Server Error"});
    }
})

router.post('/login', async (req,res) => {
    try {
        const {email,  password} = req.body;

        // Check existing user

        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).send({message: "User not found !"})
        }

        // Check password is valid or not

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(500).send({message: "Password is incorrect"});
        }

        const token = jwt.sign({userId: (await user)._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
        res.json({token});

    } catch (error) {
        console.error(error);
        res.status(500).send({message: "Internal Server error"});
    }
})

module.exports = router;
