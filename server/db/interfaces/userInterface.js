const Users = require('../models/userModel');

const findUserByName = async( name ) => {
    try {
        const user = await Users.findOne({ username: name });
        if( user ){
            return {
                data: user, 
                status: 'OK',
                message: 'User found in the database'
            }
        }

        return {
            data: null,
            status: 'ERROR',
            message: 'No user found with this name'
        }
        
    }
    catch(e){
        return {
            data: null,
            status: 'EXCEPTION',
            message: e.message
        };
    }
}

const findAllUsers = async()=>{
    try{
        const users = await User.find();
        if( users ){
            return {
                data: users, 
                status: 'OK',
                message: 'All Users found in the database'
            }
        }

        return {
            data: null,
            status: 'ERROR',
            message: 'No user found'
        }
    }catch(e){
        return {
            data: null,
            status: 'EXCEPTION',
            message: e.message
        };
    }
}

module.exports = {
    findUserByName,
    findAllUsers
}