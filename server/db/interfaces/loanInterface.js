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



module.exports = {
    getAllLoans,
    getLoanByID,
    createLoan
}
