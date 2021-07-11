const Reviews = require('../models/ReviewModel');

const postReview = async (body) => {
    try {
        const review = await Reviews.create({
            contract: body.contract,
            lender: body.lender,
            receiver: body.receiver,
            ratingValue: body.ratingValue,
            details: body.details
        });


        if( review ){
            return {
                data: review, 
                status: 'OK',
                message: 'Review has been posted.'
            }
        }


        return {
            data: null,
            status: 'ERROR',
            message: 'Review not posted.'
        }
    }catch(e){
        return {
            data: null,
            status: 'EXCEPTION',
            message: e.message
        };
    }
}

module.exports = {
    postReview
}