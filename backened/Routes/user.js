const express = require('express');
const router = express.Router();

const User = require('../models/User');
const bycrpt = require('bcrypt');

const post = require('../models/Post');
const comment = require('../models/Comments');
const verifyToken = require('../verifyToken');

router.put("/:id", verifyToken, async (req, res) => {
    try{
         if(req.body.password)
            {
                const salt = await bycrpt.genSalt(10);
                req.body.password = await bycrpt.hashSync(req.body.password, salt);
            }

            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
            res.status(200).json(updatedUser);



    }
    catch(err){
    res.status(500).json(err)
    }
}
)

//DELETE

router.delete("/:id", verifyToken, async (req, res) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        await Post.deletMany({userId: req.params.id});
        await comment.deletMany({userId: req.params.id});
        res.status(200).json({message: "User deleted"});
    }
    catch(err){
    res.status(500).json(err)
    }
}
)


//Get User

router.get("/:id", verifyToken, async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }
    catch(err){
    res.status(500).json(err)
    }
}
)

//Get All Users

router.get("/", verifyToken, async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json(users);
    }
    catch(err){
    res.status(500).json(err)
    }
}
)

module.exports = router;

