const mongoose = require("mongoose");
const validate = require('../validate');

const paymentSchema = new mongoose.Schema({
    contractId: {
        // same as transaction id
        type: mongoose.Schema.Types.ObjectId,
        ref: 'contract',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: [ 'lenderToReceiver' , 'receiverToLender' ],
        required: true
    }
});

const Payment = mongoose.model("payment", paymentSchema );


module.exports = Payment;