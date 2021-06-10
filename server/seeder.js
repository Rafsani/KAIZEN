const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path: './config/config.env'})


const Users = require('./db/models/userModel');
const LoanRequest = require('./db/models/LoanRequestModel');

//Connect DB
mongoose.connect( process.env.MONGODB_URI , {
    useUnifiedTopology: true,
    useNewUrlParser : true,
    useCreateIndex : true,
    useFindAndModify : false
})


