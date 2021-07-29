const Reports = require('../models/reportModel');


/**
 * 
 * @param - contractId, issuerId, description 
 * @returns - 
 */
 const createReport = async ( body )=>{
    try {
        const createdReport = await Reports.create({
            contractId: body.contractId,
            issuerId: body.issuerId,
            description: body.description
        })
                
        if( createdReport ){
            return {
                data: createdReport, 
                status: 'OK',
                message: 'The reprot has been issued.'
            }
        }
        
        return {
            data: null,
            status: 'ERROR',
            message: 'Report could not be issued.'
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
 * @param - contractId, issuerId, description 
 * @returns - 
 */
 const findAllReport = async ( filter , type , select )=>{
    try {
        let populate;
        if(type === 'all' ){
            populate = {
                path: 'contractId',
                populate: {
                    path: 'receiverId lenderId',
                    select: 'username'
                }
            }
        }

        const reportQueryResult = await Reports
                                        .find(filter)
                                        .populate(populate)
                                        .populate({
                                            path: 'issuerId',
                                            select: 'username usertype'   
                                        })
                                        .select(select)
                                        .sort({
                                            'issuedDate' : -1
                                        });
                
        if( reportQueryResult.length !== 0 ){
            return {
                data: reportQueryResult, 
                status: 'OK',
                message: 'All reprots have been found.'
            }
        }
        
        return {
            data: null,
            status: 'ERROR',
            message: 'Reports could not be found.'
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
 * @param - contractId, issuerId, description 
 * @returns - 
 */
 const changeReportStatus = async ( filter , update  )=>{
    try {
       const reports = await Reports.updateMany(
            filter,
            update
       )

       if( reports ){
            return {
                data: reports, 
                status: 'OK',
                message: 'All reprots have been updated.'
            }
       }
        
        return {
            data: null,
            status: 'ERROR',
            message: 'Reports could not be found.'
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
    createReport,
    findAllReport,
    changeReportStatus
}
