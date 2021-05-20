const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const {check , validationResult} = require('express-validator/check');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/UserModel')

/**User Registration */

router.post("/",[
    check('name', 'name is required').not().isEmpty(),
    check('email','please enter a valid email').isEmail(),
    check('password', 'please enter password with min. 6 or more charectors').isLength({min:6})

], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})

    }
    const{name, email, password} = req.body;
    try {
        /**Checking for existing user */
        let user = await UserModel.findOne({ email });
        if(user){
            return res.status(400).json({msg: 'User alrready exists with email provided'});
        }
        /**new user */
        user = new UserModel({
            name,
            email,
            password
        })
        /**Converting password into hash format */
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt)
        await user.save();
        
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
        
    }
});

module.exports = router;