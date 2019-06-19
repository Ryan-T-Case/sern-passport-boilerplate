import express from 'express';
import Cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';

// Use express to run our app server
const app = express();

//Set up to port our server will run on locally
const PORT = process.env.PORT || 3000;

//Import passport middleware
require('./config/passport');

//Parsing middleware
app.use(Cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Start up passport
app.use(passport.initialize());

//Serve build or public folder in either production or dev environment
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
} else{
    app.use(express.static("client/public"));
}

//Send the react app if in production
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//Import and use all routes
require('./routes/loginUser')(app);
require('./routes/registerUser')(app);
require('./routes/forgotPassword')(app);
require('./routes/resetPassword')(app);
require('./routes/updatePassword')(app);
require('./routes/updatePasswordViaEmail')(app);
require('./routes/findUsers')(app);
require('./routes/deleteUser')(app);
require('./routes/updateUser')(app);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = app;