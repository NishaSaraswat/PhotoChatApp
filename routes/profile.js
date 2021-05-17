const express = require("express");
const router = express.Router();
const {check, validationResult} = require("express-validator/check");
const userModel = require('../models/UserModel');
const userProfileModel = require('../models/UserProfileModel');
const auth = require('../middlewares/auth');

/**Show all user profile */
router.get("/", auth, async (req, res)=>{
    try {
        const userprofiles = await userProfileModel.find({user: req.user.id}).sort({date:-1});
        res.json(userprofiles);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
});

/**save user's profile */
router.post("/",[auth,
    check('name', 'Name is required').not().isEmpty(),
    check('email','Enter a valid email').isEmail(),
], async(req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({erross: errors.array()});
    }
    const {name, email, avatar, images, messages} = req.body;
    try {
        const newUser = new userProfileModel({
            name,
            email,
            avatar,
            images,
            messages,
            user: req.user.id
        });
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
});

/**Edit user profile */
router.patch("/:id", auth, async(req, res)=>{
    const {name,email,avatar,images,messages}= req.body;
    const profileFields = {};
    if(name) profileFields.name = name;
    if(email) profileFields.email = email;
    if(avatar) profileFields.avatar = avatar;
    if(images) profileFields.images = images;
    if(messages) profileFields.messages = messages;
    try {
        let userprofile = await userProfileModel.findById(req.params.id);
        if(!userprofile){
            return res.status(404).json({msg:'Profile not found'})
        }
        userprofile = await userProfileModel.findByIdAndUpdate(req.params.id,{
            $set: profileFields
        },{new: true});
        res.json(userprofile);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }

});
/**Delete user profile */
router.delete("/:id", auth,async(req, res)=>{
    try {
        let userP = await userProfileModel.findById(req.params.id);
        if(!userP){
            return res.status(401).json({msg:'User not found'});
        }
        await userProfileModel.findByIdAndRemove(req.params.id);
        res.json({msg:'Your profile is deleted now!'});
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;