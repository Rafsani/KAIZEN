const returnNextInstallmentDate = ( installmentDates ) => {
    let minDate = new Date(8640000000000000);
    let today = new Date();

    installmentDates.forEach(element => {
        if( element >= today && element < minDate ){
            minDate = element;
        }
    });

    return minDate;
}

const contractSigningDate = ( installmentDates ) => {
    return new Date(installmentDates[0].getTime() - parseInt( process.env.EXPIRE_LOAN) / 3);
}


module.exports = {
    returnNextInstallmentDate,
    contractSigningDate
}