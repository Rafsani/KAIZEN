const mongoose = require("mongoose");
const validate = require('../validate');

const contractSchema = new mongoose.Schema({
    loanId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LoanRequest',
        required: true
    },
    
    lenderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

    amount: {
        type: Number,
        min: [100 , 'Amount can not be less than 100 bdt'],
        max: [10000 , 'Amount can not be more than 10000 bdt'],
        required: true
    },

    status: {
        type: String,
        enum: ['Pending' , 'Resolved'],
        default: 'Pending'
    },

    installments: {
        type: Number,
        default: 1,
        max: [3,"Can't be more than 3 installments"]
    },

    installmentDates: [{
        type: Date
    }]
})


contractSchema.pre('save', async function( next ){
    // Adding the installment dates before saving the doc
    for( let i = 0; i < this.installments ; i++ ){
        this.installmentDates.push( Date.now() + (i+1) * 60 * 60 * 24 * 30 * 1000 );
    }

    next();


})

contractSchema.post('save' , async function(){
    // Adding the contract to the loan request model
    await this.model('LoanRequest').updateOne({ 
            _id: this.loanId
        },{
            $push: { contracts : {$each : [this._id] } }
        }
    )
})


const Contract = mongoose.model("contract", contractSchema );


module.exports = Contract;