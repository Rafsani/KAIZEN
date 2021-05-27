const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const User = require("./models/userModel") ;
const LoanRequest = require("./models/LoanRequestModel");


const CONNECTION_URL = 'mongodb+srv://user1:Rafsani@786@ecommerecesite.zksgp.mongodb.net/<dbname>?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;


try{
    mongoose.connect(CONNECTION_URL,{useNewUrlParser: true,useUnifiedTopology:true}).then( console.log("connected to MongoDB")).catch( (error) => console.log(error.message));
    mongoose.set('useFindAndModify',false);
}
catch (e)
{
    console.log(e);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "http://localhost:3000", // <-- location of the react app were connecting to
        credentials: true,
    })
);
app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true,
    })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

//----------------------------------------- END OF MIDDLEWARE---------------------------------------------------

// Routes
app.post("/login", (req, res, next) => {
    console.log(req.body);

    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        console.log(user.toString());
        if (!user) res.send("No User Exists");
        else {
            req.logIn(user, (err) => {
                if (err) throw err;
                res.send("Successfully Authenticated");
                console.log(req.user);
            });
        }
    })(req, res, next);
});

app.post("/register", (req, res) => {

    console.log(req.body);
    User.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) throw err;
        if (doc) res.send("User Already Exists");
        if (!doc) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const newUser = new User({
                username: req.body.username,
                password: hashedPassword,
            });
            await newUser.save();
            res.send("User Created");
        }
    });
});

app.get("/user", (req, res) => {
    if(req.user)
    res.send(req.user);// The req.user stores the entire user that has been authenticated inside of it.
    else res.send("Unauthorized");
});


app.get('/logout', function(req, res){
    res.send("logged out "+ req.user.username);
    req.logout();
    req.session.destroy();
    //res.redirect('http://google.com')

});


app.get("/isloggedin",(req,res)=>{
    if(req.user) {
        console.log("baaal");
        res.send("loggedin");
    }
    else
        res.send("notloggedin");
});

app.get("/getLoanRequests",(req,res)=>{
    LoanRequest.find({}, function(err, requests) {
        let req_Map = {};

        requests.forEach(function(request) {
            req_Map[request._id] = request;
        });

        res.json(requests);
});
});

app.post('/createLoanRequest', async(req,res) =>{
    console.log(req);
    let user;
    User.findOne({ username: req.body.username },(err,doc)=>{
       user = doc;
       console.log("paise");
    });
    const newRequest = new LoanRequest({
        Receiver: user,
        Amount: req.body.Amount,
        Details: req.body.Details,
        Status: "New"
    });
    await newRequest.save();
    res.send("Successfully Created LoanRequest");

});


//----------------------------------------- END OF ROUTES---------------------------------------------------
//Start Server
app.listen(PORT, () => console.log(`server running at port ${PORT}`))