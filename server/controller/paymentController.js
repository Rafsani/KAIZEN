const paymentInterface = require('../db/interfaces/paymentInterface');
const SSLCommerzPayment = require('sslcommerz');


/**
 * @description this method initializes a ssl commerce page
 * 
 * @route - /api/payment/ssl-request
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns
 * 
 */

const handleGETInitSSLCommerzPage = async( req, res, next )=>{
    try {
        const data = {
            total_amount: 100,
            currency: 'BDT',
            tran_id: 'REF123',
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
            cus_phone: '01711111111',
            cus_fax: '01711111111',
            ship_name: 'Customer Name',
            ship_add1: 'Dhaka',
            ship_add2: 'Dhaka',
            ship_city: 'Dhaka',
            ship_state: 'Dhaka',
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
            multi_card_name: 'mastercard',
            value_a: 'ref001_A',
            value_b: 'ref002_B',
            value_c: 'ref003_C',
            value_d: 'ref004_D'
        };
        const sslcommer = await new SSLCommerzPayment(process.env.STORE_ID, process.env.STORE_PASSWORD,false) //true for live default false for sandbox
        await sslcommer.init(data).then(data => {
            //process the response that got from sslcommerz 
            //https://developer.sslcommerz.com/doc/v4/#returned-parameters
            if( data?.GatewayPageURL )
            {
                return res.status(200).redirect(data?.GatewayPageURL);
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
    return res.status(200).send({
        data: req.body,
        status: "OK",
        message: "Payment has been made"
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

module.exports = {
    handleGETInitSSLCommerzPage,
    handlePOSTFailedSSLCommerzPage,
    handlePOSTCanceledSSLCommerzPage,
    handlePOSTIPNSSLCommerzPage,
    handlePOSTSuccessSSLCommerzPage
}