const express = require('express')

const router = express.Router();

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post("/register", async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hashSync(password, salt);
        const newUser = new User({
            username,
            email,
            password:  hashedPassword
        });
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    }
    catch(err){
    res.status(500).json(err)
    }
} );



//login


router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({msg: "Invalid Credentials"})
        }
        const isMatch = await bcrypt.compareSync(password, user.password);
        if(!isMatch){
            return res.status(400).json({msg: "Invalid Credentials"})
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(200).json({token, user});
    }
    catch(err){
    res.status(500).json(err)
    }
} );

//logut

router.get("/logout", async (req, res) => {
    try {
        res.clearCookie('token',{sameSite: 'none', secure: true});
        res.status(200).json({msg: "Logged Out"})
    }
    catch(err){
    res.status(500).json(err)
    }
} );

//refetch

router.get("/refetch", async (req, res) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(400).json({msg: "Invalid Credentials"})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        res.status(200).json(user);
    }
    catch(err){
    res.status(500).json(err)
    }
} );

module.exports = router;