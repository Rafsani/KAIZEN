const loanInterface = require('../db/interfaces/loanInterface');
const userInterface = require('../db/interfaces/userInterface');

/**
 * @description this method returns all loans from the database
 * @route - GET /api/auth/loans
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const handleGETallLoans = async( req,res,next)=>{
    try {
        const loanQueryResult = await loanInterface.getAllLoans();

        if( loanQueryResult.status == 'OK' ){
            return res.status(200).send(loanQueryResult);
        }

        return res.status(400).send(loanQueryResult);
    }catch(e){
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message
        });
    }
}

/**
 * @description this method returns loan with the id from the database
 * @route - GET /api/auth/loans/:id
 * @param {*} req - req.params.id
 * @param {*} res 
 * @param {*} next 
 */
const handleGETLoanById = async( req,res,next)=>{
    try {
        const loanQueryResult = await loanInterface.getLoanByID( req.params.id );

        if( loanQueryResult.status == 'OK' ){
            return res.status(200).send(loanQueryResult);
        }

        return res.status(400).send(loanQueryResult);
    }catch(e){
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message
        });
    }
}


/**
 * @description this method creates loan
 * @route - GET /api/auth/loans
 * @param {*} req - body will include user , amount, details
 * @param {*} res 
 * @param {*} next 
 */
const handlePOSTCreateLoan = async( req,res,next)=>{
    try {
        
        //won't work if there's multiple people with the same name . How do we know who's who. Must give id
        const userQueryResult = await userInterface.findUserByName( req.user.username );

        const body = {
            userId : userQueryResult.data._id,
            Amount : req.body.Amount,
            Details: req.body.Details
        }

        const loanQueryResult = await loanInterface.createLoan( body );

        if( loanQueryResult.status == 'OK' ){
            return res.status(201).send(loanQueryResult);
        }

        return res.status(400).send(loanQueryResult);
    }catch(e){
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message
        });
    }
}


module.exports = {
    handleGETallLoans,
    handleGETLoanById,
    handlePOSTCreateLoan
}