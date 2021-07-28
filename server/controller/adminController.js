const reportInterface = require('../db/interfaces/reportInterface');
const paymentInterface = require('../db/interfaces/paymentInterface');
const contractInterface = require('../db/interfaces/contractInterface');
const userInterface = require('../db/interfaces/userInterface');
const date = require('../util/date');


/**
 * @description this method issues a report
 * @route - GET /api/admin/report
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 const handleGETAllUnresolvedReports = async( req,res,next)=>{
    try {
        let output = [];


        const reportQueryResult = await reportInterface.findAllReport(
            {
                status: {
                    $ne: 'ignored'
                }
            },
            'all'
        )
        
        if( reportQueryResult.status == 'OK' ){

            let reportArray = reportQueryResult.data;

            for await( report of reportArray ){
                let paymentQueryResult = await paymentInterface.findPayment(report.contractId._id);

                output.push({
                    contractId: report.contractId._id,
                    userType: report.issuerId.usertype,
                    fullName: report.issuerId.username,
                    complaintAgainst: ( report.issuerId.userType == 'Lender' )? report.contractId.receiverId.username:report.contractId.lenderId.username,
                    description: report.description,
                    issuedDate: report.issuedDate,
                    //contract details
                    totalAmount: report.contractId.amount,
                    collectedAmount: report.contractId.collectedAmount,
                    nextInstallment: date.returnNextInstallmentDate(report.contractId.installmentDates), 
                    installmentAmount: (report.contractId.amount/report.contractId.installments) * (1 + report.contractId.interestRate/100),
                    installmentsCompleted: report.contractId.installmentsCompleted,
                    interestRate: report.contractId.interestRate,
                    defaultedInstallment: report.contractId.defaults,

                    // transaction history
                    transactions: (paymentQueryResult.status == 'OK')? paymentQueryResult.data: null
                })
                
            }

            return res.status(200).send({
                data: output,
                status: 'OK',
                message: reportQueryResult.message
            })
        }

        return res.status(400).send({
            data:null,
            status: 'ERROR',
            message: reportQueryResult.message
        })
        
    }catch(e){
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message
        });
    }
}



/**
 * @description - this method will end the contract from admin
 * @route -PUT /api/admin/contract
 * @param {*} req - body will include the user id of the request issuer + contract id
 * @param {*} res - Response for the api call
 * @returns 
 */
 const handlePUTEndContract = async ( req,res,next )=>{
    try {
        const contractQueryResult = await contractInterface.endContract({
            contractId: req.body.contractId
        });


        if( contractQueryResult.status == 'OK' ){

            const reportQueryResult = await reportInterface.changeReportStatus({
                contractId: req.body.contractId,
                status: 'pending'
            },{
                $set: { status: 'resolved'}
            });


            return res.status(200).send( {
                status: 'OK',
                data: contractQueryResult.data,
                message: contractQueryResult.message
            } );
        }

        return res.status(400).send({
            status: 'ERROR',
            data: contractQueryResult.data,
            message: contractQueryResult.message
        })
    }catch(e){
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message
        });
    }
}


/**
 * @description - this method will remove the collateral from user
 * @route -PUT /api/admin/:userId?update=collateral
 * @param {*} req - body will include the user id of the request issuer + contract id
 * @param {*} res - Response for the api call
 * @returns 
 */
 const handlePUTUpdateUserStatus = async ( req,res,next )=>{
    try {

        let update;

        if( req.query.update == 'collateral'){
            update = {
                collateral: null,
                verfiedStatus: false
            }
        }
        else if( req.query.update == 'verify'){
            update = {
                verfiedStatus: true
            }
        }

        const userQueryResult = await userInterface.findUserbyIdAndUpdate(req.params.userId ,update);


        if( userQueryResult.status == 'OK' ){
            if( req.query.update == 'collateral' ){
                const reportQueryResult = await reportInterface.changeReportStatus({
                    contractId: req.body.contractId,
                    status: 'pending'
                },{
                    $set: { status: 'resolved'}
                });
            }
            
            return res.status(200).send( {
                status: 'OK',
                data: userQueryResult.data,
                message: userQueryResult.message
            } );
        }

        return res.status(400).send({
            status: 'ERROR',
            data: userQueryResult.data,
            message: userQueryResult.message
        })
    }catch(e){
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message
        });
    }
}


/**
 * @description - this method will ignore/ the reported issue
 * @route -PUT /api/admin/report?type=ignore
 * @param {*} req - body will include the user id of the request issuer + contract id
 * @param {*} res - Response for the api call
 * @returns 
 */
 const handlePUTChangeReportStatus = async ( req,res,next )=>{
    try {
        let update;
        if(req.query.type == 'ignore' ){
            update = {
                status : 'ignore'
            }
        }

        const reportQueryResult = await reportInterface.changeReportStatus({
            contractId: req.body.contractId,
            status: 'pending'
        }, update);


        if( reportQueryResult.status == 'OK' ){


            return res.status(200).send( {
                status: 'OK',
                data: reportQueryResult.data,
                message: reportQueryResult.message
            } );
        }

        return res.status(400).send({
            status: 'ERROR',
            data: reportQueryResult.data,
            message: reportQueryResult.message
        })
    }catch(e){
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message
        });
    }
}


/**
 * @description this method issues a report
 * @route - GET /api/admin/verify
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 const handleGETAllUnverifiedUsers = async( req,res,next)=>{
    try {
        const userQueryResult = await userInterface.findAllUsers({
            usertype: 'Receiver',
            verfiedStatus: false,
            collateral: {
                $ne: null
            }
        });

        let output = [];
        if( userQueryResult.status == 'OK' ){
            userQueryResult.data.forEach( user => {
                output.push({
                    userId: user._id,
                    userType: user.usertype,
                    fullName: user.username,
                    details: user.details,
                    bkash: user.bkash,
                    collateral: user.collateral
                })
            })

            return res.status(200).send({
                data: output,
                status: 'OK',
                message: userQueryResult.message
            })
        }

        return res.status(400).send({
            data:null,
            status: 'ERROR',
            message: userQueryResult.message
        })
        
    }catch(e){
        return res.status(500).send({
            status: 'EXCEPTION',
            message: e.message
        });
    }
}

module.exports = {
   handleGETAllUnresolvedReports,
   handlePUTEndContract,
   handlePUTUpdateUserStatus,
   handlePUTChangeReportStatus,
   handleGETAllUnverifiedUsers
}