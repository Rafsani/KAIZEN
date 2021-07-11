const reviewInterface = require('../db/interfaces/reviewInterface');
const contractInterface = require('../db/interfaces/contractInterface');


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


module.exports = {
    handlePOSTReview
}