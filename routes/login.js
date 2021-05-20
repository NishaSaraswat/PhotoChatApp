const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
const config = require("config");
const {check , validationResult} = require('express-validator/check');
const bcrypt = require('bcryptjs');
const auth = require("../middlewares/login");

/**Private and users can access it after logging in */
router.get("/", auth, async (req, res)=>{
    try {
        const user = await UserModel.findById(req.user.id).select('-password')
        res.json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
});

router.post("/", [
    check('email','please enter a valid email').isEmail(),
    check('password', 'please enter password').exists()

], async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})

    }
    const {email,password} = req.body;
    try {
        let user = await UserModel.findOne({email});
        if(!user){
            return res.status(400).json({msg:'user not found!'})
        }
        const checkpassword = await bcrypt.compare(password, user.password);
        if(!checkpassword){
            return res.status(400).json({msg:'wrong password!'});
        }
        const payload = {
            user:{
                id: user.id
            }
        };
        jwt.sign(payload,config.get("SecretKey"), {
            expiresIn: 360000
        },(err, token)=>{ 
            if(err) throw err;
            res.json({ token });
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;
