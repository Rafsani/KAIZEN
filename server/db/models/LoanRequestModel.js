const mongoose = require("mongoose");
const validate = require('../validate');

const LoanRequestSchema = new mongoose.Schema({

    Receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        unique: [true, "Can't post a new loan/donation request. Already has one active one"]
    },

    Amount: {
        type: Number,
        required: true,
        min: [100,"Amount can not be less than 100 bdt"],
        max: [10000,"Amount can not be more than 10000 bdt"],
        immutable: true
    },

    Details: {
        type: String,
        required: true,
        validate: {
            validator: validate.validateDetails
        }
    },

    // Pending = In process ; Resolved = the money has been collected
    Status: {
        type: String,
        enum: ['Resolved' , 'Pending'],
        default: 'Pending'
    },

    collectedAmount: {
        type: Number,
        default: 0,
        max: [this.Amount, "Collected Amount can not be more than the required amount"]
    },

    issueDate: {
        type: Date,
        default: Date.now
    },

    typeOfLoan: {
        type: String,
        enum: ['Loan' , 'Donation'],
        default: 'Loan'
    }
});

LoanRequestSchema.post('save' , async function( ) {
    if( this.collectedAmount >= this.Amount ){
        this.Status = 'Resolved';
    }
})

LoanRequestSchema.index({
    // this will index that database based on the issue date in ascending order
    issueDate: 1
} , {
    // will expire after 3 months
    expireAfterSeconds: (60*60*24*30*3)
    // expireAfterSeconds: (60)
})

const LoanRequest = mongoose.model("LoanRequest", LoanRequestSchema);


module.exports = LoanRequest;