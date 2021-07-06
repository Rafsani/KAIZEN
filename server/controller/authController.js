const authInterface = require('../db/interfaces/authInterface');
const passport = require("passport");
const User = require('../db/models/userModel');

/**
 * @description - Creates a new user
 * @route - POST /api/auth/register
 * @param {*} req - req.body will include username , password
 * @param {*} res - response for the api call
 * @param {*} next 
 */
const handlePOSTregisterUser = async ( req,res,next )=>{
    try {
        const authQueryResult = await authInterface.registerUser( req.body );

        if( authQueryResult.status == 'OK' ){
            return res.status(201).send({
                status: 'OK',
                data: authQueryResult.data,
                message: authQueryResult.message
            })
        }

        return res.status(400).send({
            status: 'ERROR',
            data: authQueryResult.data,
            message: authQueryResult.message
        })
    }catch(e){
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message
        });
    }
}

/**
 * @description - Logs in a new user
 * @route - POST /api/auth/login
 * @param {*} req - req.body will include username , password
 * @param {*} res - response for the api call
 * @param {*} next 
 */
const handlePOSTloginUser = async ( req,res,next )=>{
    try {

        passport.authenticate("local", (err, user, info) => {
            
            if (!user) {
                return res.status(400).send({
                    status: 'ERROR',
                    data: null,
                    message: 'Could not log in the user'
                })
            }
            else {
                req.logIn(user, (err) => {
                    return res.status(200).send({
                        status: 'OK',
                        data: user,
                        message: 'Successfully Authenticated'
                    })
                });
            }
        })(req, res, next);

    }catch(e){
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message
        });
    }
}




/**
 * @description - Logs out a user
 * @route - GET /api/auth/logout
 * @param {*} req 
 * @param {*} res - response for the api call
 * @param {*} next 
 */
 const handleGETlogoutUser = async ( req,res,next )=>{
    try {
        res.status(200).send({
            status: "OK",
            message: `The user ${req.user.username} has been logged out`,
        });

        // calling logout middleware here
        next();
        return;

    }catch(e){
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message
        });
    }
}


/**
 * @description - returns currently logged in user
 * @route - GET /api/auth/isloggedin
 * @param {*} req 
 * @param {*} res - response for the api call
 * @param {*} next 
 */
 const handleGETloggedinUser = async ( req,res,next )=>{
    try {
        if(req.user) {
            const userQueryResult = await authInterface.loggedInUser( req.user.email );
            return res.status(200).send({
                data: userQueryResult,
                status: "OK",
                message: `The user ${req.user.email} is logged in`,
            });
        }

        return res.status(400).send({
            status: "Error",
            message: `No user logged in`,
        })
        

    }catch(e){
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message
        });
    }
}


const getLoggedInUser = async (req,res) => {
    let user ;
    if( req.user ){
        user = await req.user;
    }
    return user;
}


/**
 * @description - Fills out information for a user
 * @route - POST /api/auth/registerdata
 * @param {*} req - body will include username, details, dob, nid, bkash, collateral
 * @param {*} res - response for the api call
 * @param {*} next 
 */

const handlePOSTregisterUserFormData = async ( req,res,next )=>{
    try {
        let authQueryResult;
        let userInfo ;
        await getLoggedInUser(req,res).then(json => {
            userInfo = json;
            return;
        });;

        if( userInfo ){
            authQueryResult = await authInterface.registerUserFormData( req.body , userInfo );
        }

        if( authQueryResult.status == 'OK' ){
            return res.status(201).send({
                status: 'OK',
                data: authQueryResult.data,
                message: authQueryResult.message
            })
        }

        return res.status(400).send({
            status: 'ERROR',
            data: authQueryResult.data,
            message: authQueryResult.message
        })
    }catch(e){
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message
        });
    }
}

/**
 * @description - Check if hidden information present for a user
 * @route - GET /api/auth/:userId
 * @param {*} req - 
 * @param {*} res - response for the api call
 * @param {*} next 
 */

const handleGETFormFilled = async ( req,res,next )=>{
    try {
        const authQueryResult = await authInterface.checkIfFormFilled(req.params.userId);

        if( authQueryResult.status == 'OK' ){
            return res.status(200).send({
                status: 'OK',
                data: authQueryResult.data,
                message: authQueryResult.message
            })
        }

        return res.status(400).send({
            status: 'ERROR',
            data: authQueryResult.data,
            message: authQueryResult.message
        })
    }catch(e){
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message
        });
    }
}





module.exports = {
    handlePOSTregisterUserFormData,
    handlePOSTregisterUser,
    handlePOSTloginUser,
    handleGETlogoutUser,
    handleGETloggedinUser,
    handleGETFormFilled
}