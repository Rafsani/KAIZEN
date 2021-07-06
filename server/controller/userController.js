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
 * @description this method returns the user's history of site usage ( contract for lender / loan for receiver )
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
        let  outputHistory ;
        let historyQueryResult;

        /** This is for the lender dashboard */
        if( userQueryResult.data.usertype == 'Lender' ){
            historyQueryResult = await contractInterface.findContractHistory( req.params.userId );

            if( historyQueryResult.status == 'OK' ){
                let currentlyActiveContacts = [];
                let maxAmountLent = 0; // this returns the max amount of loan for the lender
                let nextInstallmentDate = new Date( new Date().getTime() + ( 4 * 30 * 24 * 60 * 60 * 1000 ) );
                let nextInstallmentAmount = 0;
                let completedContractCount = historyQueryResult.data.filter( item => {
                    if( item.status == 'Resolved' ){
                        return item;
                    }
                    else {
                        let tempDate = ( item.installmentDates.length == 1 ) ? 0 : item.defaults;

                        currentlyActiveContacts.push( {
                            contractId : item._id,
                            receiverId: item.receiverId._id,
                            receiverName: item.receiverId.username,
                            amount: item.amount,
                            collectedAmount: item.collectedAmount,
                            nextInstallmentAmount : item.amount / item.installments,
                            nextInstallmentDate: item.installmentDates[ tempDate ], 
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
        /** This is for the receiver dashboard */
        else if( userQueryResult.data.usertype == 'Receiver' ){
            historyQueryResult = await loanInterface.getLoanByUserID( req.params.userId ) ;
            
            if( historyQueryResult.status == 'OK' ){
                let loanRequests = historyQueryResult.data.length;
                let totalContracts = 0;
                historyQueryResult.data.forEach( item => {
                    totalContracts += item.contracts.length;
                });

                outputHistory = {
                    loanRequests ,
                    totalContracts,
                    defaults: userQueryResult.data.loanDefaults,
                    review: userQueryResult.data.rating
                }
            }
        }
        if( userQueryResult.status == 'OK' && (historyQueryResult.status == 'OK' || historyQueryResult.status == 'OK') ){
            return res.status(200).send({
                data: outputHistory,
                status: 'OK',
                message: historyQueryResult.message
            });
        }

        return res.status(400).send(historyQueryResult) ;
        
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
                email : "receiver@gmail.com"
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
                return res.status(200).send( output );
            }

            loanQueryResult = await loanInterface.getLoanByUserID( authQueryresult.data , 'Pending' );

            if( loanQueryResult.status != 'OK' || !loanQueryResult.data ){
                // console.log(loanQueryResult);
                return res.status(200).send(output);
            }
    
            output.data = true;
            output.status = 'OK';
            output.message = 'Loan request can be made';
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
