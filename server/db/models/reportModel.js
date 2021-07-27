const mongoose = require("mongoose");
const validate = require('../validate');

const reportSchema = new mongoose.Schema({
    contractId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'contract',
        required: true
    },

    issuerId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    
    issuedDate : {
        type: Date,
        default: Date.now
    },

    description: {
        type: String,
        validate: {
            validator: validate.validateDetails
        }
    },

    status: {
        type: String,
        enum: ['pending' , 'resolved' , 'ignored'],
        default: 'pending'
    }
});


const Report = mongoose.model("report", reportSchema );


module.exports = Report;