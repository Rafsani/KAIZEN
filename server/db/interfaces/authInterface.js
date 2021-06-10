const Users = require('../models/userModel');
const bcrypt = require("bcryptjs");

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

        const hashedPassword = await bcrypt.hash( body.password, 10);
        console.log(body);

        const newUser = new Users({
            username : body.username,
            password: hashedPassword
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





module.exports = {
    registerUser
}