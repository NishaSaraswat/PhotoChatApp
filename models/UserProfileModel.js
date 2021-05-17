const mongoose = require('mongoose');

const UserProfileSchema =mongoose.Schema({

    user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'users'
    },
        name:{
            type: String,
            required: true
        },
        email:{

            type: String,
            required: true,
            unique: true
        },
        avatar:{
                type: String,
                required: false
        },
        images:{
            type: String,
            required: true
        },
        messages:{
            type: String,
            required: false
        },
        

        date:{
                type: Date,
                default: Date.now
        },
        
});
module.exports = mongoose.model("profile",UserProfileSchema);