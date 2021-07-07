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
        let userVerifiedStatus = false;

        if( body.usertype == 'Lender' ){
            userVerifiedStatus = true
        }
        const userQueryResult = await Users.findOneAndUpdate( {
            email: userInfo.email
        },
        {
            username: body.fullname,
            nid: body.nid,
            bkash: body.bkash,
            usertype: body.usertype,
            dob: body.dob,
            details: body.about,
            verfiedStatus: userVerifiedStatus,
            collateral: body.collateral
        },
        {
            returnOriginal: false
        });
    
        if( userQueryResult ){
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
        return {
            data: null,
            status: 'EXCEPTION',
            message: e.message
        };
    }
}




/**
 * @param - userId
 * @returns - bool values for hiddden details & collateral
 */
const checkIfFormFilled = async ( userId ) => {
    try {
        const user = await Users.findById( userId );

        if( !user ){
            return {
                data: null,
                status: 'ERROR',
                message: 'User information could not be chekced'
            }  
        }

        let output = {
            hiddenDetails : false,
            collateral : false
        };

        if( user.collateral ){
            output.collateral = true;
        }

        if( user.nid ){
            output.hiddenDetails = true;
        }

        if (!output.hiddenDetails || (!output.collateral && user.usertype !== "Lender")) {
            return {
                data: output, 
                status: 'OK',
                message: 'User has not filled out the form'
            }    
        }

        return {
            data: output, 
            status: 'OK',
            message: 'User has filled out the form'
        }

    }catch(e){
        return {
            data: null,
            status: 'EXCEPTION',
            message: e.message
        };
    }
}

/** returns the user currently logged in */
const loggedInUser = async ( email ) =>{
    try {
        const userId = await Users.find({email}).select('_id');


        if( userId.length !== 0 ){
            return {
                data: userId[0]._id, 
                status: 'OK',
                message: 'User has been found'
            }

        }

        return {
            data: null,
            status: 'ERROR',
            message: 'User could not be found'
        } 

    }catch(e){
        console.log("Here");
        return {
            data: null,
            status: 'EXCEPTION',
            message: e.message
        };
    }  
}


module.exports = {
    registerUserFormData,
    registerUser,
    checkIfFormFilled,
    loggedInUser
}
