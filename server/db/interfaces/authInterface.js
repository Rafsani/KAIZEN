const Users = require('../models/userModel');

/**
 * @description registers new users
 * @param  body 
 * @returns new user details
 */
const registerUser = async( body )=> {
    try {
        const oldUser = await Users.findOne({ username: body.username })
        
        if( oldUser ){
            return {
                data: null,
                status: 'ERROR',
                message: 'User already exists in the database'
            }
        }

        const newUser = new Users({
            username : body.username,
            password: body.password
        });

        await newUser.save();

        if( newUser ){
            return {
                data: newUser, 
                status: 'OK',
                message: 'A new user has been added to the database'
            }
        }
        
        return {
            data: null,
            status: 'ERROR',
            message: 'New user could not be created'
        }
    }catch( e ){
        return {
            data: null,
            status: 'EXCEPTION',
            message: e.message
        };
    }
}



const registerUserFormData = async ( body , userInfo )=> {
    try {
        const userQueryResult = await Users.findOneAndUpdate( {
            email: userInfo.email
        },
        {
            username: body.fullname,
            nid: body.nid,
            bkash: body.bkash,
            usertype: body.usertype,
            dob: body.dob,
            details: body.about
        },
        {
            returnOriginal: false
        });
    
        if( userQueryResult ){
            console.log(userQueryResult);
            return {
                data: userQueryResult, 
                status: 'OK',
                message: 'Users information has been added to the database'
            }
        }
        return {
            data: null,
            status: 'ERROR',
            message: 'User information could not be filled'
        }
    }catch( e ){
        console.log("Error: " + e);
        return {
            data: null,
            status: 'EXCEPTION',
            message: e.message
        };
    }
}





module.exports = {
    registerUserFormData,
    registerUser
}