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


const findReviewForUser = async (userId)=>{
    try{
        const review = await Reviews.find({
            receiver : userId
        })
        .populate({
            path: 'contract',
            select: '_id amount installmentDates'
        })
        .populate({
            path: 'lender',
            select: 'username'
        })
        ;

        if( review ){
            return {
                data: review, 
                status: 'OK',
                message: 'Reviews have been found.'
            }
        }


        return {
            data: null,
            status: 'ERROR',
            message: 'Reviews not found.'
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
    postReview,
    findReviewForUser
}