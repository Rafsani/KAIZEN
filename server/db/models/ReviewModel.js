const mongoose = require("mongoose");
const validate = require('../validate');
const ReviewSchema = new mongoose.Schema({

   contract : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'contract',
        required: true
   },

   receiver : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
   },

   lender : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
   },

   ratingValue: {
       type: Number,
       min: [ 0.5 , 'Can not be less than 0.5'],
       max: [ 5 , 'Can not be more than 5'],
       required: true
   },

   details : {
        type: String,
        validate: {
            validator: validate.validateDetails
        }
   }
});



/** Preventing one lender from posting more than 1 review for 1 contract */
ReviewSchema.index({ contract: 1 , lender: 1 }, {unique: 1} );

//Static method to get average rating and save
ReviewSchema.statics.getAverageRating = async function( receiverId , contractId ) {
    try {
        const obj = await this.aggregate([
            {
                $match: { receiver : mongoose.Types.ObjectId(receiverId) }
            },
            {
                $group : {
                    _id : '$receiver',
                    averageRating : {$avg : '$ratingValue'}
                }
            }
         ]);

         await this.model('user').findByIdAndUpdate( receiverId , {
            rating : obj[0].averageRating.toFixed(2)
        });

        // resolving the contract
        await this.model('contract').findByIdAndUpdate( contractId , {
            status : 'Resolved'
        });
        
    }catch(e){
        console.log("Error: " + e);
    }
}


ReviewSchema.post('save', async function(){
    await this.constructor.getAverageRating( this.receiver , this.contract );
})



const Review = mongoose.model("Review", ReviewSchema);


module.exports = Review;