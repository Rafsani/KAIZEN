const LoanRequest = require('../models/LoanRequestModel');

/**
 * @description list of all loans
 * @returns all loans
 */
 const getAllLoans = async( type , sort )=> {
    try {
        const loans = await LoanRequest.find(
            {
                 typeOfLoan : type.charAt(0).toUpperCase() + type.slice(1) , // capitalizing the first letter
                 Status: 'Pending'
            })
            .populate({
            path: 'Receiver',
            // options: { sort: [[sort , 'desc']]} // will be added back when we have added reviews to the user model
            })
            .populate({
                path: 'contracts'
            });
        
        if( loans ){
            return {
                data: loans, 
                status: 'OK',
                message: 'All loans from the database'
            }
        }

        return {
            data: null,
            status: 'ERROR',
            message: 'No loans found'
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
 * @description get loan by id
 * @param  body - :id
 * @returns the loan with the id
 */
 const getLoanByID = async( body )=> {
    try {
        const loan = await LoanRequest.findById( body ).populate('Receiver');
        
        if( loan ){
            return {
                data: loan, 
                status: 'OK',
                message: 'Loan has been found from the database'
            }
        }

        return {
            data: null,
            status: 'ERROR',
            message: 'No loan found'
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
 * @description - returns the loan request for a user
 * @param  body - user id  , all / pending check
 * @returns 
 */
 const getLoanByUserID = async( body , pendingCheck )=> {
    try {

        const loan = await LoanRequest.find( { 
            Receiver : body
        } )
        .populate({
            path: 'contracts'
        })
        .populate({
            path: 'Receiver'
        });


        let resolvedContract = true;
        
        if( pendingCheck ){

            /** Checking if there's any lender left for any request that is not pending */
            loan.every( item => {
                item.contracts.every( element => {
                    if( element.status == 'Pending' ){
                        resolvedContract = false;
                        return false;
                    }
    
                    return true;
                })
    
                if( !resolvedContract || item.Status == pendingCheck ){
                    resolvedContract = false;
                    return false;
                }
                return true;
            })


            if( resolvedContract ){
                return {
                    data: true,
                    status: 'OK',
                    message: 'Can post request at this time'
                }
            }
        }

        if( pendingCheck == undefined && loan.length != 0 ){
            return {
                data: loan,
                status: 'OK',
                message: 'All loans for this user have been fetched from the database'
            }
        }
        
        return {
            data: false, 
            status: 'ERROR',
            message: 'Can not post request or fetch loan'
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
 * @description - returns the loan offers for a user
 * @param  body - user id
 * @returns 
 */
 const getLoanOffersByUserID = async( body , field )=> {
    try {

        const loan = await LoanRequest.findById(body)
        .populate({
            path: field,
            populate: {
                path: 'lenderId'
            }
        });

        if( loan ){
            return {
                data: loan, 
                status: 'OK',
                message: 'Fetched Loan Offers'
            }
        }
        
        return {
            data: null, 
            status: 'ERROR',
            message: 'Can not fetch loan offers'
        }
    }catch( e ){
        return {
            data: null,
            status: 'EXCEPTION',
            message: e.message
        };
    }
}

/** WILL BE REMOVED */
/**
 * @description - repays the loan
 * @param  body - contractId
 * @returns 
 */
 const repayLoan = async( contractId )=> {
    try {

        const loan = await LoanRequest.findOneAndUpdate( {
            contracts: { $in: contractId }
        } , {
            $pull: { contracts : contractId }, // add to set only adds once
        },
        { safe: true });

        if( loan ){
            return {
                data: loan, 
                status: 'OK',
                message: 'Repaid Loan'
            }
        }
        
        return {
            data: null, 
            status: 'ERROR',
            message: 'Can not repay loan'
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
 * @description create loan
 * @param  body -  user , amount, details
 * @returns the newly created loan
 */
 const createLoan = async( body )=> {
    try {
        const loan = await LoanRequest.create({
            Receiver: body.userId,
            Amount: body.Amount,
            Details: body.Details
            //Status: "New"
        })
        
        if( loan ){
            return {
                data: loan, 
                status: 'OK',
                message: 'Loan has been created in the database'
            }
        }

        return {
            data: null,
            status: 'ERROR',
            message: 'No loan created'
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
 * @description accept loan offer
 * @param  body -  loanId , issuerId, contractId
 * @returns the updated loan
 */
 const acceptContractOffer = async( body )=> {
    try {
        console.log(body.contractId);
        const loan = await LoanRequest.findOneAndUpdate( {
            _id: body.loanId,
            Receiver: body.issuerId
        } , {
            $addToSet: { contracts : body.contractId }, // add to set only adds once
            $pull: { offerRequests : body.contractId }
        },{
            safe: true
        });

        console.log(loan);
        
        if( loan ){
            return {
                data: loan, 
                status: 'OK',
                message: 'Contract offer has been accepted'
            }
        }

        return {
            data: null,
            status: 'ERROR',
            message: 'Contract offer could not be accepted'
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
 * @description deny loan offer
 * @param  body -  loanId , issuerId, contractId
 * @returns the updated loan
 */
 const denyContractOffer = async( body )=> {
    try {
        const loan = await LoanRequest.findOneAndUpdate( {
            _id: body.loanId,
            Receiver: body.issuerId
        } , {
            $pull: { offerRequests : body.contractId }
        },
        { safe: true });
        
        if( loan ){
            return {
                data: loan, 
                status: 'OK',
                message: 'Contract offer has been denied'
            }
        }

        return {
            data: null,
            status: 'ERROR',
            message: 'Contract offer could not be denied'
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
 * @description returns last issued loan id
 * @param  body -  userId
 * @returns loan Id
 */
 const lastIssuedLoan = async( body )=> {
    try {
        const loan = await LoanRequest.find({
            Receiver: body
        }).sort({
            issueDate : 1
        });

        
        if( loan ){
            return {
                data: loan[0]._id, 
                status: 'OK',
                message: 'Recently issued loan has been found'
            }
        }

        return {
            data: null,
            status: 'ERROR',
            message: 'Loan was not found'
        }
    }catch( e ){
        return {
            data: null,
            status: 'EXCEPTION',
            message: e.message
        };
    }
}



module.exports = {
    getAllLoans,
    getLoanByID,
    createLoan,
    getLoanByUserID,
    getLoanOffersByUserID,
    acceptContractOffer,
    denyContractOffer,
    lastIssuedLoan,
    repayLoan
}
