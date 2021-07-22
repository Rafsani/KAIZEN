const mongoose = require("mongoose");
const validate = require('../validate');

const paymentSchema = new mongoose.Schema({
    
});

const Payment = mongoose.model("payment", paymentSchema );


module.exports = Payment;