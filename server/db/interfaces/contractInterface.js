const Contracts = require('../models/contractModel');



/**
 * 
 * @param body - will include the contract id and the id of the request issuer who has to be the lender
 * @returns 
 */
const endContract = async (body)=>{
    try {
        const finishedContract = await Contracts.updateOne( {
            _id: body.contractId,
            lenderId: body.issuerId
        } , {
            status: 'Resolved'
        });
                
        if( finishedContract ){
            return {
                data: finishedContract, 
                status: 'OK',
                message: 'The contract has been ended.'
            }
        }
        
        return {
            data: null,
            status: 'ERROR',
            message: 'Contract could not be ended.'
        }
    }catch(e){
        return {
            data: null,
            status: 'EXCEPTION',
            message: e.message
        };
    }
}

/**
 * 
 * @param userId 
 * @returns - completed contracts , maximum amount lent, next installment date & amount
 */
const findContractHistory = async (userId)=>{
    try {
        const contractQueryResult = await Contracts.find({
            lenderId : userId
        })
        .populate({
            path: 'receiverId'
        })
        .populate({
            path: 'loanId'
        })
        ;

                
        if( contractQueryResult ){

            return {
                data: contractQueryResult, 
                status: 'OK',
                message: 'User history of contracts has been found.'
            }
        }
        
        return {
            data: null,
            status: 'ERROR',
            message: 'history not found.'
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
    endContract,
    findContractHistory
}
