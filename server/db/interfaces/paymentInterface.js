const Payment = require('../models/paymentModel');

/**
 * @description makes a payment
 * @returns 
 */
 const makePayment = async( body )=> {
    try {
        const payment = await Payment.create({
            contractId: body.contractId,
            amount: body.amount,
            type: body.type,
            bankTransactionId: body.bankTransactionId,
            issueDate: body.issueDate,
            bkash: body.bkash
        });

        
        if( payment ){
            return {
                data: payment, 
                status: 'OK',
                message: 'Payment has been made'
            }
        }

        return {
            data: null,
            status: 'ERROR',
            message: 'No payment made'
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
 * @description finds all payment for a contract id
 * @returns 
 */
 const findPayment = async( id )=> {
    try {
        const payment = await Payment.find({
            contractId: id
        });

        
        if( payment.length != 0){
            return {
                data: payment, 
                status: 'OK',
                message: 'Payment has been found'
            }
        }

        return {
            data: null,
            status: 'ERROR',
            message: 'No payment found'
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
    makePayment,
    findPayment
}

