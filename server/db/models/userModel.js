const mongoose = require("mongoose");
const validate = require('../validate');
const bcrypt = require("bcryptjs");


const userSchema = new mongoose.Schema({
   
    username: {
        type: String,
        validate : {
            validator: validate.validateString,
            msg: 'Name can not be empty.'
        }
    },

    details: {
        type: String,
        validate: {
            validator: validate.validateDetails,
            msg: 'Need to provide details about yourself'
        }
    },

    password: {
        type: String,
        required: true,
        validate: {
            validator: validate.validateString,
            msg: 'Invalid password'
        }
    },

    dob: {
        type: Date,
        // makes sure the user is over 18 years old
        validate: {
            validator: validate.validateAge,
            msg: 'Age can not be less than 18 years.'
        }
    },

    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: validate.validateEmail,
            msg: 'Invalid email address.'
        }
    },

    nid: {
        type: String,
        unique: true,
        sparse: true,
        validate: {
            validator: checkNID,
            msg: 'NID is not valid.'
        }
    },

    bkash: {
        type: String,
        unique: true,
        sparse: true,
        validate: {
            validator: validate.validatePhone,
            msg: 'Invalid phone number.'
        }
    },

    usertype: {
        type: String,
        enum: ['Lender' , 'Receiver'],
        default: 'Lender'
    },

    verfiedStatus: {
        type: Boolean,
        default: function() {
            if( this.usertype == 'Receiver' ){
                return false;
            }
            else {
                return true;
            }
        }
    },

    collateral: {
        type: String,
        validate: {
            validator: validate.validateYoutubeUrl // user has to provide a youtube video of their collateral
        }
    }, 

    joinedDate : {
        type: Date,
        default: Date.now
    },

    loanDefaults : {
        type: Number,
        default: 0,
        max: [3, 'Can not have more than 3 defaults' ]
    },

    rating: {
        type: Number,
        default: 5,
        max: 5,
        min: 0.5
    },
    
    image: {
        path: {
            type: String,
            default: '../client/public/uploads/user.png'
        },
        contentType: {
            type: String,
            default: 'image/jpeg'
        }
    }
});


/// Validate NID
function checkNID( NID ) {
    if( NID > 0 ){
        // console.log(this.username + " : " + this.dob );
        return true;
    }

    else {
        return false;
    }
}


userSchema.pre('save' , async function(next){
    this.password = await bcrypt.hash( this.password, 10);
    if( this.nid != undefined ) this.nid = await bcrypt.hash( this.nid , 10);
    next();
})

const User = mongoose.model("user", userSchema);



module.exports = User;