const contractInterface = require('../db/interfaces/contractInterface');
const loanInterface = require('../db/interfaces/loanInterface');
const userInterface = require('../db/interfaces/userInterface');
const authInterface = require('../db/interfaces/authInterface');
const checkInstallmentDate = require('../util/date');
/**
 * @description - this method will post a contract
 * @route - POST /api/contract
 * @param {*} req - body will include the user id of the lender Id + receiver id + loan Id + amount + installments
 * @param {*} res - Response for the api call
 * @returns 
 */
 const handlePOSTCreateContract = async ( req,res,next )=>{
    try {
        // making sure that amount is less than needed
        const loanQueryResult = await loanInterface.getLoanByID( req.body.loanId );
        if( loanQueryResult.data.Amount - loanQueryResult.data.collectedAmount < req.body.amount  ){
            return res.status(400).send({
                status: 'ERROR',
                data: null,
                message: "Amount is more than needed for the loan request"
            })
        }


        const contractQueryResult = await contractInterface.createContract({
            loanId: req.body.loanId,
            lenderId: req.body.lenderId,
            receiverId: req.body.receiverId,
            amount: req.body.amount,
            installments: req.body.installments
        });

        if( contractQueryResult.status == 'OK' ){
            return res.status(200).send( {
                status: 'OK',
                data: contractQueryResult.data,
                message: contractQueryResult.message
            } );
        }

        return res.status(400).send({
            status: 'ERROR',
            data: contractQueryResult.data,
            message: contractQueryResult.message
        })
    }catch(e){
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message
        });
    }
}

/**
 * @description - this method will return the active contract , otherwise contract request
 * @route - GET /api/contract/:receiverId  // can be lenderId as well
 * @param {*} req - request for the api call
 * @param {*} res - Response for the api call
 * @returns 
 */
 const handleGETActiveContract = async ( req,res,next )=>{
    try {
        if( req.user == undefined ) {
            req.user = {
                email : "anik65@gmail.com"
            }
        }


        const authQueryresult = await authInterface.loggedInUser(req.user.email);
        const user = await userInterface.findUserbyId( authQueryresult.data );
        let contractQueryResult;
        
        if( authQueryresult.status == 'OK' ){

            if( user.data.usertype == 'Lender' ){
                contractQueryResult = await contractInterface.activeContract({
                    receiverId: req.params.id,
                    lenderId: authQueryresult.data
                });
            }else {
                contractQueryResult = await contractInterface.activeContract({
                    lenderId: req.params.id,
                    receiverId: authQueryresult.data
                });
            }


            if( contractQueryResult.status == 'OK' ){

                let outputContract;

                let data = contractQueryResult.data;
                let index = -1;
                let offerIndex = -1;
                let outputData;

                data.every( (item , idx ) => {
                    if( item.status == 'Pending' ){
                        index = idx;
                        return false;
                    }
                    else if( item.status == 'Requested' ){
                        offerIndex = idx;
                    }

                    return true;
                })

                if( index != -1 ){
                    outputData = data[index];
                    const bkashInspect = await userInterface.fetchBkashNumber(req.params.id);
                    if( bkashInspect.status == 'OK' ){
                        outputContract = {
                            activeContract: true,
                            bkash: bkashInspect.data,
                            contractId: outputData._id,
                            totalAmount : outputData.amount,
                            signingDate : checkInstallmentDate.contractSigningDate( outputData.installmentDates ),
                            collectedAmount: outputData.collectedAmount,
                            nextInstallment: checkInstallmentDate.returnNextInstallmentDate( outputData.installmentDates ),
                            nextInstallmentAmount: (outputData.amount / outputData.installments) * ( 1 + outputData.interestRate / 100 ),
                            installmentsCompleted: outputData.installmentsCompleted,
                            interestRate: outputData.interestRate,
                            defaultedInstallments: outputData.defaultedInstallments
                        }
    
                        return res.status(200).send( {
                            status: 'OK',
                            data: outputContract,
                            message: contractQueryResult.message
                        } );
                    }
                }

                /**Checking For Contract Offer here */
                else if( offerIndex != -1 ){
                    outputData = data[offerIndex];
                    outputContract = {
                        activeContract: false,
                        contractId: outputData._id,
                        totalAmount : outputData.amount,
                        signingDate : checkInstallmentDate.contractSigningDate( outputData.installmentDates ),
                        installments:  outputData.installments,
                        firstInstallmentDate: checkInstallmentDate.returnNextInstallmentDate( outputData.installmentDates ),
                        finalInstallmentDate: outputData.installmentDates[ outputData.installmentDates.length - 1 ],
                        totalAmountWithInterest: outputData.amount * ( 1 + outputData.interestRate /100 ),
                        interestRate: outputData.interestRate
                    }

                    return res.status(200).send( {
                        status: 'OK',
                        data: outputContract,
                        message: "Contract Offer has been found"
                    } );
                }
                
                else {
                    return res.status(200).send( {
                        status: 'ERROR',
                        data: null,
                        message: "No active request at this moment. Nor any contract offer found."
                    } );
                }
                
            }
        }

        return res.status(400).send({
            status: 'ERROR',
            data: contractQueryResult.data,
            message: contractQueryResult.message
        })
    }catch(e){
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message
        });
    }
}


/**
 * @description - this method will end the contract
 * @route -PUT /api/contract
 * @param {*} req - body will include the user id of the request issuer + contract id
 * @param {*} res - Response for the api call
 * @returns 
 */
const handlePUTEndContract = async ( req,res,next )=>{
    try {
        const contractQueryResult = await contractInterface.endContract({
            contractId: req.body.contractId,
            issuerId: req.body.issuerId
        });

        if( contractQueryResult.status == 'OK' ){
            return res.status(200).send( {
                status: 'OK',
                data: contractQueryResult.data,
                message: contractQueryResult.message
            } );
        }

        return res.status(400).send({
            status: 'ERROR',
            data: contractQueryResult.data,
            message: contractQueryResult.message
        })
    }catch(e){
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message
        });
    }
}


/**
 * @description - this method will end the contract
 * @route -PUT /api/contract/:contractId
 * @param {*} req - body will include the user id of the request issuer + contract id
 * @param {*} res - Response for the api call
 * @returns 
 */
const handlePUTAcceptContract = async ( req,res,next )=>{
    try {
        let contractQueryResult = await contractInterface.acceptContract({
            contractId: req.params.id,
            issuerId: req.body.issuerId
        });

        if( contractQueryResult.status == 'OK' ){

            const loanQueryResult = await loanInterface.acceptContractOffer( {
                loanId: contractQueryResult.data.loanId,
                contractId: req.params.id,
                issuerId: req.body.issuerId
            });


            if( loanQueryResult.status == 'OK' ){
                return res.status(200).send( {
                    status: 'OK',
                    data: contractQueryResult.data,
                    message: contractQueryResult.message
                } );
            }
        }

        return res.status(400).send({
            status: 'ERROR',
            data: contractQueryResult.data,
            message: contractQueryResult.message
        })
    }catch(e){
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message
        });
    }
}
/**
 * @description - this method will end the contract
 * @route -PUT /api/contract/:contractId
 * @param {*} req - body will include the user id of the request issuer + contract id
 * @param {*} res - Response for the api call
 * @returns 
 */
const handleDELETEDenyContract = async ( req,res,next )=>{
    try {
        let contractQueryResult = await contractInterface.denyContract({
            contractId: req.params.id,
            issuerId: req.body.issuerId
        });

        if( contractQueryResult.status == 'OK' ){

            const loanQueryResult = await loanInterface.denyContractOffer( {
                loanId: contractQueryResult.data.loanId,
                contractId: req.params.id,
                issuerId: req.body.issuerId
            });

            if( loanQueryResult.status == 'OK' ){
                return res.status(200).send( {
                    status: 'OK',
                    data: contractQueryResult.data,
                    message: contractQueryResult.message
                } );
            }
        }

        return res.status(400).send({
            status: 'ERROR',
            data: contractQueryResult.data,
            message: contractQueryResult.message
        })
    }catch(e){
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message
        });
    }
}


module.exports = {
    handlePUTEndContract,
    handlePOSTCreateContract,
    handlePUTAcceptContract,
    handleDELETEDenyContract,
    handleGETActiveContract
}
