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
            // console.log(contractQueryResult);
            let currentlyActiveContacts = [];
            let maxAmountLent = 0; // this returns the max amount of loan for the lender
            let nextInstallmentDate = new Date( new Date().getTime() + ( 4 * 30 * 24 * 60 * 60 * 1000 ) );
            let nextInstallmentAmount = 0;
            let completedContractCount = contractQueryResult.filter( item => {
                if( item.status == 'Resolved' ){
                    return item;
                }
                else {
                    currentlyActiveContacts.push( {
                        contractId : item._id,

                    } );

                    if( item.amount > maxAmountLent ){
                        maxAmountLent = item.amount;
                    } 

                    
                    item.installmentDates.forEach(element => {
                        if( element < nextInstallmentDate ){
                            nextInstallmentDate = element;
                            nextInstallmentAmount = item.amount / item.installments
                        }
                    });
                }
            }).length;
            // let nextInstallmentDate = 
            let outputHistory = {
                completedContractCount,
                maxAmountLent ,
                nextInstallmentDate,
                nextInstallmentAmount,
                currentlyActiveContacts
            }

            return {
                data: outputHistory, 
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
