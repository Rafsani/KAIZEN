const paymentInterface = require('../db/interfaces/paymentInterface');
const contractInterface = require('../db/interfaces/contractInterface');
const SSLCommerzPayment = require('sslcommerz');
const axios = require('axios');


/**
 * @description this method initializes a ssl commerce page
 * 
 * @route - /api/payment/ssl-transaction
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns
 * 
 */

const handlePOSTInitSSLCommerzPage = async( req, res, next )=>{
    try {

        const contractQueryResult = await contractInterface.findContract( req.body.contractId );
        
        if( contractQueryResult.data.loanSanctioned && req.body.paymentType == 'lenderToReceiver' ){
            return res.status(400).send({
                message:"Payment already made"
            })
        }
        
        const initialData = {
            total_amount: req.body.total_amount,
            currency: 'BDT',
            tran_id: `C${req.body.contractId}`,
            success_url: 'http://localhost:5000/api/payment/ssl-payment-success',
            fail_url: 'http://localhost:5000/api/payment/ssl-payment-failure',
            cancel_url: 'http://localhost:5000/api/payment/ssl-payment-cancel',
            ipn_url: 'http://localhost:5000/api/payment/ssl-payment-ipn',
            shipping_method: 'Courier',
            product_name: 'Computer.',
            product_category: 'Electronic',
            product_profile: 'general',
            cus_name: 'Customer Name',
            cus_email: 'cust@yahoo.com',
            cus_add1: 'Dhaka',
            cus_add2: 'Dhaka',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: req.body.bkash,
            cus_fax: req.body.bkash,
            ship_name: 'Customer Name',
            ship_add1: 'Dhaka',
            ship_add2: 'Dhaka',
            ship_city: 'Dhaka',
            ship_state: 'Dhaka',
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
            multi_card_name: 'mastercard',
            value_a: req.body.contractId,
            value_b: req.body.paymentType,
            value_c: req.body.bkash,
            value_d: 'ref004_D'
        };
        const sslcommer = await new SSLCommerzPayment(process.env.STORE_ID, process.env.STORE_PASSWORD,false) //true for live default false for sandbox
        await sslcommer.init(initialData).then(data => {
            //process the response that got from sslcommerz 
            //https://developer.sslcommerz.com/doc/v4/#returned-parameters
            if( data?.GatewayPageURL )
            {
                // console.log("In init: " + data.redirectGatewayURL.split('?')[1] + "bkash");

                // https://sandbox.sslcommerz.com/gwprocess/v4/gw.php?Q=REDIRECT&cardname=bkash&SESSIONKEY=EF7A337B05C4C871A4C70A40FC06043F&tran_type=success

                const redirectedURL = `https://sandbox.sslcommerz.com/gwprocess/v4/bankgw/indexhtmlOTP.php?` + data.redirectGatewayURL.split('?')[1] + "bkash"
                return res.status(200).send({
                    redirectedURL,
                    message: "Transaction has been made, need to be confirmed",
                    status: "OK"
                });
            }
            else {
                return res.status(400).send({
                    message:"Payment not completed"
                })
            }
        });
    }catch(e){
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message
        });
    }
}


/**
 * @description this method return a successful ssl commerce page
 * 
 * @route - POST /api/payment/ssl-payment-success
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns
 * 
 */

const handlePOSTSuccessSSLCommerzPage = async (req,res,next)=>{
    // Here the payment request is being successful

    const paymentQueryResult = await paymentInterface.makePayment({
        contractId: req.body.value_a,
        amount: req.body.amount,
        type: req.body.value_b,
        bankTransactionId: req.body.bank_tran_id,
        issueDate: req.body.tran_date,
        bkash: req.body.value_c
    });



    return res.status(200).send({
        data:  paymentQueryResult.data,
        status: "OK",
        message: paymentQueryResult.message
    })
}

/**
 * @description this method return a failed ssl commerce page
 * 
 * @route - POST /api/payment/ssl-payment-failure
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns
 * 
 */

const handlePOSTFailedSSLCommerzPage = async (req,res,next)=>{
    return res.status(400).send({
        data: req.body,
        status: "ERROR",
        message: "Payment could not be made"
    })
}
/**
 * @description this method return a failed ssl commerce page
 * 
 * @route - POST /api/payment/ssl-payment-cancel
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns
 * 
 */

const handlePOSTCanceledSSLCommerzPage = async (req,res,next)=>{
    return res.status(400).send({
        data: req.body,
        status: "ERROR",
        message: "Payment could not be made"
    })
}
/**
 * @description this method return a failed ssl commerce page
 * 
 * @route - POST /api/payment/ssl-payment-ipn
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns
 * 
 */

const handlePOSTIPNSSLCommerzPage = async (req,res,next)=>{
    return res.status(400).send({
        data: req.body,
        status: "ERROR",
        message: "Payment could not be made"
    })
}


/**
 * @description this method returns the information for the transaction 
 * 
 * @route - POST /api/payment/ssl-transaction?tran_id=59C2A4F6432F8
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns
 * 
 */

const handleGETTransactionInfo = async (req,res,next)=>{
    // console.log(req.query.tran_id);

    
    try {
        const redirectedURL = `https://sandbox.sslcommerz.com/validator/api/merchantTransIDvalidationAPI.php?tran_id=${req.query.tran_id}&store_id=${process.env.STORE_ID}&store_passwd=${process.env.STORE_PASSWORD}&format=json`

        let data;

        await axios.get(redirectedURL)
        .then(response => {
            // console.log(response.data.url);
            data = response.data;
        })
        .catch(error => {
            console.log(error);
        });

        if( data.no_of_trans_found == 0 ){
            return res.status(400).send({
                data: null,
                status: "ERROR",
                message: "Information could not be found"
            })
        }

        let output = [];

        data.element.forEach(item => {
            output.push({
                bankTransactionId: item.bank_tran_id,
                amount: item.amount,
                issueDate: item.tran_date,
                type: item.value_b
            });
        });
        
        return res.status(200).send({
            data: output,
            message: "Transaction Info has been found",
            status: "OK"
        })  ;
    } catch (e) {
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message
        });
    }
}




module.exports = {
    handleGETTransactionInfo,
    handlePOSTInitSSLCommerzPage,
    handlePOSTFailedSSLCommerzPage,
    handlePOSTCanceledSSLCommerzPage,
    handlePOSTIPNSSLCommerzPage,
    handlePOSTSuccessSSLCommerzPage
}