const loanInterface = require('../db/interfaces/loanInterface');
const userInterface = require('../db/interfaces/userInterface');
const authInterface = require('../db/interfaces/authInterface');
const _ = require("lodash");
const checkInstallmentDate = require('../util/date');

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
            // no need to check for lender type since they won't have collateral
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


/**
 * @description this method returns pending loan for userId
 * @route - GET /api/loans/user/:userId
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 const handleGETPendingLoanForUser = async( req,res,next)=>{
    try {
        
        const loanQueryResult = await loanInterface.getLoanByUserID( req.params.userId );

        let output;
        if( loanQueryResult.status == 'OK' ){
            let data = loanQueryResult.data[0];
            let minInstallmentDate = new Date(8640000000000000);

            // checks every contract in the loan for minimum installment date
            data.contracts.forEach( element => {
                let minDate = checkInstallmentDate.returnNextInstallmentDate( element.installmentDates );

                if( minDate < minInstallmentDate ){
                    minInstallmentDate = minDate;
                }
            }) 
            
            let outputInstallmentDate = ( minInstallmentDate.getTime() == new Date(8640000000000000).getTime() ) ? "No Contract Signed Yet": minInstallmentDate.getDate() + '/' + parseInt(minInstallmentDate.getMonth() + 1) + '/' + minInstallmentDate.getFullYear();
            let outputExpirationDate = new Date( new Date(data.issueDate).getTime() + parseInt( process.env.EXPIRE_LOAN ) );

            output = {
                leftAmount: data.Amount - data.collectedAmount ,
                totalAmount: data.Amount,
                nextInstallment:  outputInstallmentDate,
                expirationDate: outputExpirationDate,
                progress:( data.collectedAmount  ) * 100 / data.Amount,
                currentLenders: data.contracts.length,
                totalRequest: data.offerRequests.length
            }
            return res.status(200).send({
                data: output,
                status: 'OK',
                message: 'Found pending loan in the database'
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


/**
 * @description this method returns loan request offers for a receiver
 * @route - GET /api/loans/request/:loanId
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const handleGETLoanOffers = async (req,res,next) => {
    try {
        const loanQueryResult = await loanInterface.getLoanOffersByUserID( req.params.loanId , 'offerRequests' );
        let outputOffers = [];
    
        if( loanQueryResult.status == 'OK' ){
            let loanOffers = loanQueryResult.data.offerRequests; // since there can only be 1 pending loan request at a time
            loanOffers.forEach( contractRequest => {
                let totalAmount = contractRequest.amount;
                let expirationDate = contractRequest.installmentDates[ contractRequest.installmentDates.length - 1 ];
                let installments = contractRequest.installments;
                let interestRate = contractRequest.interestRate;
    
                outputOffers.push({
                    contractId: contractRequest._id,
                    lenderName: contractRequest.lenderId.username,
                    totalAmount,
                    expirationDate,
                    installments,
                    interestRate
                });
            })
    
            if( outputOffers.length != 0 ){
                return res.status(200).send({
                    data: outputOffers,
                    status: loanQueryResult.status,
                    message: "All offers for this loan request have been fetched"
                });
            }
        }
    
        return res.status(400).send(loanQueryResult) ;
    }catch(e){
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message
        });
    }
}

/**
 * @description this method returns loan request offers for a receiver
 * @route - GET /api/loans/lenders/:loanId
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 const handleGETCurrentLenders = async (req,res,next) => {
    try {
        const loanQueryResult = await loanInterface.getLoanOffersByUserID( req.params.loanId , 'contracts' );
        let outputOffers = [];
    
        if( loanQueryResult.status == 'OK' ){
            let currentLenders = loanQueryResult.data.contracts; // since there can only be 1 pending loan request at a time
            currentLenders.forEach( contractRequest => {
                let totalAmount = contractRequest.amount;
                let collectedAmount = contractRequest.collectedAmount;
                let nextInstallmentDate = checkInstallmentDate.returnNextInstallmentDate( contractRequest.installmentDates );
                let installmentAmount = totalAmount / contractRequest.installments
                let installments = contractRequest.installments;
                let installmentsCompleted = contractRequest.installmentsCompleted;
                let interestRate = contractRequest.interestRate;
                let myDefaults = contractRequest.defaults;
    
                outputOffers.push({
                    contractId: contractRequest._id,
                    lenderName: contractRequest.lenderId.username,
                    totalAmount,
                    collectedAmount,
                    nextInstallmentDate,
                    installmentAmount,
                    installments,
                    installmentsCompleted,
                    interestRate,
                    myDefaults
                });
            })
    
            if( outputOffers.length != 0 ){
                return res.status(200).send({
                    data: outputOffers,
                    status: loanQueryResult.status,
                    message: "All offers for this loan request have been fetched"
                });
            }
        }
    
        return res.status(400).send(loanQueryResult) ;
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
    handlePOSTCreateLoan,
    handleGETPendingLoanForUser,
    handleGETLoanOffers,
    handleGETCurrentLenders
}