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
            type: body.type
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


module.exports = {
    makePayment
}

