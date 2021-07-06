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

    interestRate: {
        type: Number ,
        min: [5 , 'Interest rate can not be less than 5%']
    },

    collectedAmount : {
        type: Number,
        default: 0
    },

    // if the receiver doesn't pay back money in time,, this is only for this contract
    defaults: {
        type: Number,
        max: [1, 'Can not default more than 1 time on this contract'],
        default: 0
    },

    status: {
        type: String,
        enum: ['Requested', 'Pending' , 'Resolved'],
        default: 'Requested'
    },

    installments: {
        type: Number,
        default: 1,
        max: [3,"Can't be more than 3 installments"]
    },

    installmentsCompleted: {
        type: Number,
        default: 0,
        max: [this.installments,"Can't be more than 3 installments completed"]
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

    // check if the receiver is verified, if so then the interest rate will be 5% , otherwise 8%
    let userVerifiedStatus = await this.model('user').findById(this.receiverId);
    if( userVerifiedStatus.verfiedStatus ){
        this.interestRate = 5;
    }
    else {
        this.interestRate = 8;
    }

    next();


})

contractSchema.post('save' , async function(){
    // Adding the contract to the loan request model
    if( this.status == 'Pending'){
        await this.model('LoanRequest').updateOne({ 
                _id: this.loanId
            },{
                $addToSet: { contracts : {$each : [this._id] } }
            }
        )
    }else if( this.status == 'Requested'){
        await this.model('LoanRequest').updateOne({ 
                _id: this.loanId
            },{
                $addToSet: { offerRequests : {$each : [this._id] } }
            }
        )
    }
});



const Contract = mongoose.model("contract", contractSchema );


module.exports = Contract;