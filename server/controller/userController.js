const userInterface = require('../db/interfaces/userInterface');
const contractInterface = require('../db/interfaces/contractInterface');
const authInterface = require('../db/interfaces/authInterface');
const loanInterface = require('../db/interfaces/loanInterface');
const paymentInterface = require('../db/interfaces/paymentInterface');
const reportInterface = require('../db/interfaces/reportInterface');
const date = require('../util/date')


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
 * @description this method returns the user's transaction history
 * @route - GET /api/user/transaction/:userId
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 const handleGETUserTransactionHistoryById = async( req,res,next)=>{
    try {
        // make sure the user making the request has the same id as the one's data we are fetching
        /** not yet implemented */
        const contractQueryResult = await contractInterface.findContractForUser( req.params.userId );
        
        if( contractQueryResult.status == 'OK' ){
            let output = [];
            
            let paymentQueryResult;


            for await ( element of contractQueryResult.data ){
                paymentQueryResult = await paymentInterface.findPayment(element._id);

                if( paymentQueryResult.status === 'OK' ){
                    output.push( paymentQueryResult.data );
                }
            }            

            if( output ){
                return res.status(200).send({
                    data: output,
                    message: "All transactions for this user have been found",
                    status: "OK"
                });
            }
        }

        return res.status(400).send({
            data: null,
            message: "Transaction History Not found",
            status: "ERROR"
        });
        
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
                            installmentsCompleted:  item.installments - item.installmentDates.length,
                            image: item.receiverId.image,
                            loanSanctioned: item.loanSanctioned
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
            const receiverQueryResult = await userInterface.findUserbyId( req.params.userId );
            
            if( historyQueryResult.status == 'OK' && receiverQueryResult.status == 'OK' ){
                let username = receiverQueryResult.data.username;
                let details = receiverQueryResult.data.detais;
                let loanRequests = historyQueryResult.data.length;
                let totalContracts = 0;
                historyQueryResult.data.forEach( item => {
                    totalContracts += item.contracts.length;
                });

                outputHistory = {
                    username,
                    details,
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
                email : "rafsani119@gmail.com"
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

/**
 * @description this method returns lender information for receiver
 * @route - GET /api/user/view/:lenderId
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const handleGETLenderInfo = async (req,res,next)=>{
    try {
        if( req.user == undefined ) {
            req.user = {
                email : "shwarup101@gmail.com"
            }
        }

        const authQueryresult = await authInterface.loggedInUser(req.user.email);
        const user = await userInterface.findUserbyId( authQueryresult.data );
        let output;

        if( authQueryresult.status == 'OK' && user.data.usertype == 'Receiver' ){
           const userQueryResult = await contractInterface.viewLenderContracts( req.params.lenderId );
           let userInfo = await userInterface.findUserbyId( req.params.lenderId );
           if( userQueryResult.status == 'OK' ){
                let data = userQueryResult.data;
            
                let maxAmountLent = 0;
                let totalAmountLent = 0;
                let defaults = 0;
                let completedContracts = 0;
    
                data.forEach( item => {
                    if( item.status != 'Requested' ){
                        if( item.amount > maxAmountLent ){
                            maxAmountLent = item.amount;
                        }
    
                        totalAmountLent += item.amount;
    
                        if( item.status == 'Resolved' ){
                            completedContracts++;
                        }
    
                        defaults += item.defaults;
                    }
                });
    
                output = {
                    name: userInfo.data.username,
                    details: userInfo.data.details,
                    image: userInfo.data.image,
                    maxAmountLent,
                    totalAmountLent,
                    defaults,
                    completedContracts
                }
    
                return res.status(200).send({
                    data: output,
                    status: 'OK',
                    message: userQueryResult.message
                });
           }

           return res.status(400).send({
               data:null,
               status: 'ERROR',
               message: 'Lender Details could not be fetched'
           })
        }

    }catch(e){
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message
        });
    }
}


/**
 * @description this method returns the user's search base
 * @route - GET /api/user/search/:userId
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 const handleGETUserSearchBase = async( req,res,next)=>{
    try {
        
        const userQueryResult = await userInterface.findUserbyId( req.params.userId );
        let searchQueryResult ;
        let output = [];
        
        if( userQueryResult.data.usertype == 'Receiver' ){
            // will return all the requested and pending contract offers
            searchQueryResult = await contractInterface.findSearchableContracts(req.params.userId , userQueryResult.data.usertype , {
                receiverId : req.params.userId,
                status: { 
                    $ne : 'Resolved'
                }

            });
    
            searchQueryResult.data.forEach(item => {
                output.push(item.lenderId)
            });
        }
        else {
            searchQueryResult = await userInterface.findAllUsers( {
                usertype: 'Receiver'
            } , '' , 'username usertype image' );

            output = searchQueryResult.data;
        }
        
        if( searchQueryResult.status == 'OK' ){
            
            return res.status(200).send({
                data: output,
                status: 'OK',
                message: searchQueryResult.message
            });
        }
        return res.status(400).send({
            data:null,
            status: 'ERROR',
            message: 'No search result found'
        })
        
    }catch(e){
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message
        });
    }
}


/**
 * @description this method issues a report
 * @route - GET /api/user/report/:userId
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 const handlePOSTReport = async( req,res,next)=>{
    try {
        
        const reportQueryResult = await reportInterface.createReport( {
            contractId: req.body.contractId,
            issuerId: req.params.userId,
            description: req.body.description
        } );
        
        if( reportQueryResult.status == 'OK' ){
            return res.status(201).send({
                data: reportQueryResult.data,
                status: 'OK',
                message: reportQueryResult.message
            })
        }

        return res.status(400).send({
            data:null,
            status: 'ERROR',
            message: reportQueryResult.message
        })
        
    }catch(e){
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message
        });
    }
}




/**
 * @description this method returns the user's report history
 * @route - GET /api/user/:userId/report
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 const handleGETUserReportsById = async( req,res,next)=>{
    try {
        // make sure the user making the request has the same id as the one's data we are fetching
        /** not yet implemented */
        const reportQueryResult = await reportInterface.findAllReport({
            issuerId: req.params.userId
        }, 'all');

        if( reportQueryResult.status == 'OK' ){
            return res.status(200).send(reportQueryResult);
        }

        return res.status(400).send(reportQueryResult);
        
    }catch(e){
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message
        });
    }
}


/**
 * @description this method returns the user's loan history
 * @route - GET /api/user/:userId/loan
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 const handleGETUserLoanHistory = async( req,res,next)=>{
    try {
        // make sure the user making the request has the same id as the one's data we are fetching
        /** not yet implemented */
        const loanQueryResult = await loanInterface.getAllLoansForUser({
            Receiver : req.params.userId
        });

        let output = [];

        if( loanQueryResult.status == 'OK' ){

            loanQueryResult.data.forEach( loan => {

                let contracts = [];

                loan.contracts.forEach( contract => {
                    contracts.push({
                        contractId: contract._id,
                        contractStatus: contract.status,
                        lenderName: contract.lenderId.username,
                        contractSigningDate: date.contractSigningDate( contract.installmentDates ),
                        bkash: contract.lenderId.bkash,
                        installmentsCompleted: contract.installmentsCompleted,
                        loanAmount: contract.amount,
                        repaidAmount: contract.collectedAmount
                    });
                });

                output.push({
                    loanId: loan._id,
                    loanStatus: loan.Status,
                    receiverName: loan.Receiver.username,
                    type: loan.typeOfLoan,
                    details: loan.Details,
                    issuedDate: loan.issueDate,
                    requiredAmount: loan.Amount,
                    collectedAmount: loan.collectedAmount,
                    interestRate: ( loan.Receiver.verfiedStatus ) ? 5 : 8,
                    defaultedInstallments: loan.Receiver.loanDefaults,

                    contracts
                });
            });

            return res.status(200).send({
                data: output,
                status: 'OK',
                message: "All loans for this user have been found"
            });
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
    handleGETCheckIfLoanRequestCanBeMade,
    handleGETLenderInfo,
    handleGETUserTransactionHistoryById,
    handleGETUserSearchBase,
    handlePOSTReport,
    handleGETUserReportsById,
    handleGETUserLoanHistory
}
