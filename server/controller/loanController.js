const loanInterface = require('../db/interfaces/loanInterface');
const userInterface = require('../db/interfaces/userInterface');
const authInterface = require('../db/interfaces/authInterface');
const _ = require("lodash");

/**
 * @description this method returns all loans from the database
 * @route - GET /api/auth/loans?type=loan&sortby=review
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const handleGETallLoans = async( req,res,next)=>{
    try {
        let type , sort , output;
        
        type = ( req.query.type == undefined )? 'loan':req.query.type;
        sort = ( req.query.sort == undefined )? 'review':req.query.sort;

        const loanQueryResult = await loanInterface.getAllLoans( type , sort );

        if( type == 'donation' && loanQueryResult.status == 'OK' ){
            return res.status(200).send(loanQueryResult.data);
        }

        else {
            /** Make sure only the loans where there's already no established contract show up for the user */
            const authQueryresult = await authInterface.loggedInUser( req.user.email ); // should return the current user id

            if( authQueryresult.status == 'OK' ){
                output = loanQueryResult.data.filter( item => {
                    let retValue = true;

                    item.contracts.every( element => {

                        if( _.isEqual( element.lenderId , authQueryresult.data ) ){ // using lodash to check equality between two objects
                            retValue = false;
                            return false; // for every if we don't return a true the iteration stops;
                        }
                        
                        return true;
                    });
                    
                    return retValue;
                } );

                if( loanQueryResult.status == 'OK' ){
                    return res.status(200).send(output);
                }
            }
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
            return res.status(200).send(loanQueryResult.data);
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
 * @route - POST /api/loans
 * @param {*} req - body will include user , amount, details
 * @param {*} res 
 * @param {*} next 
 */
const handlePOSTCreateLoan = async( req,res,next)=>{
    try {
        if( req.user == undefined ) {
            req.user = {
                email : "receiver@gmail.com"
            }
        }

        let authQueryresult = await authInterface.loggedInUser( req.user.email ); // user id is here

        let loanQueryResult , formQueryResult;

        if( authQueryresult.status == 'OK' ){
            // checking if the user has filled out the form
            formQueryResult = await authInterface.checkIfFormFilled( authQueryresult.data );

            if( !formQueryResult.data.hiddenDetails || !formQueryResult.data.collateral ){
                return res.status(400).send( formQueryResult );
            }

            loanQueryResult = await loanInterface.getLoanByUserID( authQueryresult.data , 'Pending' );

            if( loanQueryResult.status != 'OK' || !loanQueryResult.data ){
                return res.status(400).send(loanQueryResult);
            }

            const body = {
                userId : authQueryresult.data,
                Amount : req.body.Amount,
                Details: req.body.Details
            }
    
            loanQueryResult = await loanInterface.createLoan( body );
    
            if( loanQueryResult.status == 'OK' ){
                return res.status(201).send(loanQueryResult);
            }
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