const userInterface = require('../db/interfaces/userInterface');
const contractInterface = require('../db/interfaces/contractInterface');
const authInterface = require('../db/interfaces/authInterface');
const loanInterface = require('../db/interfaces/loanInterface');

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
        let contractQueryResult , outputHistory;

        /** This is for the lender dashboard */
        if( userQueryResult.data.usertype == 'Lender' ){
            contractQueryResult = await contractInterface.findContractHistory( req.params.userId );

            if( contractQueryResult.status == 'OK' ){
                // console.log(contractQueryResult);
                let currentlyActiveContacts = [];
                let maxAmountLent = 0; // this returns the max amount of loan for the lender
                let nextInstallmentDate = new Date( new Date().getTime() + ( 4 * 30 * 24 * 60 * 60 * 1000 ) );
                let nextInstallmentAmount = 0;
                let completedContractCount = contractQueryResult.data.filter( item => {
                    if( item.status == 'Resolved' ){
                        return item;
                    }
                    else {
                        currentlyActiveContacts.push( {
                            contractId : item._id,
                            amount: item.amount,
                            collectedAmount: item.collectedAmount,
                            nextInstallmentAmount : item.amount / item.installments,
                            nextInstallmentDate: item.installmentDates[0], // since after an installment has been completed/defaulted we will remove the date
                            interestRate : item.interestRate,
                            contractDefaults: item.defaults,
                            installmentsCompleted:  item.installments - item.installmentDates.length
                        } );
    
                        if( item.amount > maxAmountLent ){
                            maxAmountLent = item.amount;
                        } 
    
                        
                        item.installmentDates.forEach(element => {
                            if( element < nextInstallmentDate ){
                                nextInstallmentDate = element;
                                nextInstallmentAmount = item.amount / item.installments;
                            }
                        });
                    }
                }).length;
    
                outputHistory = {
                    completedContractCount,
                    maxAmountLent ,
                    nextInstallmentDate,
                    nextInstallmentAmount,
                    currentlyActiveContacts
                }
    
            }
        }

        if( userQueryResult.status == 'OK' && contractQueryResult.status == 'OK' ){
            return res.status(200).send({
                data: outputHistory,
                status: 'OK',
                message: contractQueryResult.message
            });
        }

        return res.status(400).send(contractQueryResult);
        
    }catch(e){
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message
        });
    }
}


/**
 * @description this method checkes if loan request can be made
 * @route - GET /api/user/loanverify
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const handleGETCheckIfLoanRequestCanBeMade = async (req,res,next)=>{
    try {
        if( req.user == undefined ) {
            req.user = {
                email : "akid100@gmail.com"
            }
        }

        let output = {
            data: false,
            status: 'ERROR',
            message: 'Loan Request Can Not Be Made'
        }

        let authQueryresult = await authInterface.loggedInUser( req.user.email ); // user id is here

        let loanQueryResult , formQueryResult;

        if( authQueryresult.status == 'OK' ){
            // no need to check for lender type since they won't have collateral
            // checking if the user has filled out the form
            formQueryResult = await authInterface.checkIfFormFilled( authQueryresult.data );

            if( !formQueryResult.data.hiddenDetails || !formQueryResult.data.collateral ){
                return res.status(400).send( output );
            }

            loanQueryResult = await loanInterface.getLoanByUserID( authQueryresult.data , 'Pending' );

            if( loanQueryResult.status != 'OK' || !loanQueryResult.data ){
                return res.status(400).send(output);
            }
    
            return res.status(200).send(output);
            
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
    handleGETUserById,
    handleGETUserHistory,
    handleGETCheckIfLoanRequestCanBeMade
}