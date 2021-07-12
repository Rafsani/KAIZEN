const reviewInterface = require('../db/interfaces/reviewInterface');
const contractInterface = require('../db/interfaces/contractInterface');
const date = require('../util/date');


/**
 * @description - this method will post a review
 * @route - POST /api/review
 * @param {*} req - body will include the user id of the lender Id + receiver id + contract Id + ratingValue + details
 * @param {*} res - Response for the api call
 * @returns 
 */

const handlePOSTReview = async (req,res,next)=>{
    try {
        const contractQueryResult = await contractInterface.findContract( req.body.contract );
        if( contractQueryResult.status == 'OK' && contractQueryResult.data.status != 'Requested' ){
            const reviewQueryResult = await reviewInterface.postReview( req.body );

            if( reviewQueryResult.status == 'OK' ){
                return res.status(201).send( {
                    status: 'OK',
                    data: reviewQueryResult.data,
                    message: reviewQueryResult.message
                } );
            }
        }

        return res.status(400).send({
            status: 'ERROR',
            data: null,
            message: "Could not post the review"
        })
    }catch(e){
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message
        });
    }
}

/**
 * @description - this method will return reviews for a user
 * @route - GET /api/review/:receiverId
 * @param {*} req -
 * @param {*} res - Response for the api call
 * @returns 
 */

const handleGETReview = async (req,res,next)=>{
    try {
        const reviewQueryResult = await reviewInterface.findReviewForUser( req.params.receiverId );

        let output = []
        
        if( reviewQueryResult.status == 'OK' ){
            
            reviewQueryResult.data.forEach( item => {
                output.push({
                    _id: item._id,
                    receiver: item.receiver,
                    lender: item.lender.username,
                    rating: item.ratingValue,
                    details: item.details,
                    totalAmount: item.contract.amount,
                    issueDate: date.contractSigningDate( item.contract.installmentDates ),
                    contractId: item.contract._id
                })
            })

            return res.status(200).send( {
                status: 'OK',
                data: output,
                message: reviewQueryResult.message
            } );
        }
        

        return res.status(400).send({
            status: 'ERROR',
            data: null,
            message: "Could not post the review"
        })
    }catch(e){
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message
        });
    }
}


module.exports = {
    handlePOSTReview,
    handleGETReview
}