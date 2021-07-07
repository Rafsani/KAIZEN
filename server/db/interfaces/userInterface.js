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

const findUserbyId = async( userId ) => {
    try {
        const user = await Users.findById(userId);
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
        const users = await Users.find();
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

const fetchBkashNumber = async ( userId) =>{
    try {
        const value = await Users.findById(userId);

        if( value ){
            return {
                data: value.bkash, 
                status: 'OK',
                message: 'Users bkash number found in the database'
            }
        }

        return {
            data: null,
            status: 'ERROR',
            message: 'No number found'
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
    findAllUsers,
    findUserbyId,
    fetchBkashNumber
}