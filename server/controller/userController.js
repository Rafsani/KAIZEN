const userInterface = require('../db/interfaces/userInterface');
const contractInterface = require('../db/interfaces/contractInterface');

/**
 * @description this method returns the user's private data
 * @route - GET /api/user/:userId
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 const handleGETUserById = async( req,res,next)=>{
    try {
        // make sure the user making the request has the same id as the one's data we are fetching
        /** not yet implemented */
        const userQueryResult = await userInterface.findUserbyId( req.params.userId );

        if( userQueryResult.status == 'OK' ){
            return res.status(200).send(userQueryResult);
        }

        return res.status(400).send(userQueryResult);
        
    }catch(e){
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message
        });
    }
}

/**
 * @description this method returns the user's history of site usage
 * @route - GET /api/user/:userId/history
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 const handleGETUserHistory = async( req,res,next)=>{
    try {
        // make sure the user making the request has the same id as the one's data we are fetching
        /** not yet implemented */
        const userQueryResult = await userInterface.findUserbyId( req.params.userId ); // this will include the number of defaults as well
        let contractQueryResult;

        if( userQueryResult.data.usertype == 'Lender' ){
            contractQueryResult = await contractInterface.findContractHistory( req.params.userId );
        }

        if( userQueryResult.status == 'OK' && contractQueryResult.status == 'OK' ){
            return res.status(200).send(contractQueryResult);
        }

        return res.status(400).send(contractQueryResult);
        
    }catch(e){
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message
        });
    }
}



module.exports = {
    handleGETUserById,
    handleGETUserHistory
}