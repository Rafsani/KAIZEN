const logoutUser = async( req , res, next )=>{
    req.logout();
    req.session.destroy();
}

module.exports = {
    logoutUser
}