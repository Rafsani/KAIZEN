const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path: './config/config.env'})


const Users = require('./db/models/userModel');
const LoanRequest = require('./db/models/LoanRequestModel');
const Contracts = require('./db/models/contractModel');

//Connect DB
mongoose.connect( process.env.MONGODB_URI , {
    useUnifiedTopology: true,
    useNewUrlParser : true,
    useCreateIndex : true,
    useFindAndModify : false
})


let loans = require('./seeder_data/loan_data.json')
let users = require('./seeder_data/user_data.json')
let contracts = require('./seeder_data/contract_data.json')


//Import data to database
const importData = async () =>{
    try {
        
        await Users.create( users );
        await LoanRequest.create( loans );
        await Contracts.create( contracts );

        console.log('Data Imported...');
        process.exit()
    }
    catch(err ){
        console.error(err)
    }
}

//Delete data
const deleteData = async()=>{
    try {

        const collections = await mongoose.connection.db.collections()

        for (let collection of collections) {
            await collection.deleteMany()
        }

        console.log('Data Deleted...');
        process.exit()
    }
    catch(err ){
        console.error(err)
    }
}

if( process.argv[2] === '-i' ){
    importData();

}else if( process.argv[2] === '-d'){
    const db = mongoose.connection

    db.once('open', () =>{
        deleteData();
    })
    
}