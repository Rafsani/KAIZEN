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


module.exports = {
    returnNextInstallmentDate
}