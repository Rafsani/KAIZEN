const Contracts = require('../models/contractModel');



/**
 * 
 * @param body - will include the contract id and the id of the request issuer who has to be the lender
 * @returns 
 */
const activeContract = async (body)=>{
    try {
        const contract = await Contracts.find( {
            receiverId: body.receiverId,
            lenderId: body.lenderId
        });
                
        if( contract ){
            return {
                data: contract, 
                status: 'OK',
                message: 'There is an active contract.'
            }
        }
        
        return {
            data: null,
            status: 'ERROR',
            message: 'Contract could not be found.'
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
 * @param body - will include the contract id, issuer id and change it's status
 * @returns 
 */
const acceptContract = async (body)=>{
    try {
        const acceptedContract = await Contracts.findOneAndUpdate( {
            _id: body.contractId,
            receiverId: body.issuerId
        } , {
            status: 'Pending' // from requested to pending
        });
                
        if( acceptedContract ){
            return {
                data: acceptedContract, 
                status: 'OK',
                message: 'The contract offer has been accepted.'
            }
        }
        
        return {
            data: null,
            status: 'ERROR',
            message: 'Contract could not be accepted.'
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
 * @param body - will include the contract id, issuer id and remove it from contract model
 * @returns 
 */
const denyContract = async (body)=>{
    try {
        const deniedContract = await Contracts.findOneAndDelete( {
            _id: body.contractId,
            receiverId: body.issuerId
        });
                
        if( deniedContract ){
            return {
                data: deniedContract, 
                status: 'OK',
                message: 'The contract offer has been denied.'
            }
        }
        
        return {
            data: null,
            status: 'ERROR',
            message: 'Contract could not be denied.'
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
 * @param body - body will include the user id of the lender Id + receiver id + loan Id + amount + installments
 * @returns 
 */
 const createContract = async (body)=>{
    try {
        const createdContract = await Contracts.create({
            loanId: body.loanId,
            lenderId: body.lenderId,
            receiverId: body.receiverId,
            amount: body.amount,
            installments: body.installments
        })
                
        if( createdContract ){
            return {
                data: createdContract, 
                status: 'OK',
                message: 'The contract has been created.'
            }
        }
        
        return {
            data: null,
            status: 'ERROR',
            message: 'Contract could not be created.'
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
    findContractHistory,
    createContract,
    acceptContract,
    denyContract,
    activeContract
}
