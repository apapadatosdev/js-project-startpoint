const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const cors = require('cors');
//const passport = require('passport');
const authjwt = require('./middleware/auth.jwt')();
const authjwtrefresh = require('./middleware/auth.jwtrefresh')();
const authlocal = require('./middleware/auth.local')();

const app = express();
const PORT = process.env.PORT || 3000;
const taskRoutes = require('./routes/tasks.route')
const authRoutes = require('./routes/auth.route');


const errorHandler = (error, request, response, next) => {
    // Error handling middleware functionality
    console.log( `Uncaught error ${error.message}`) // log the error
    const status = error.status || 400
    // send back an easily understandable error message to the caller
    response.status(status).json({error: error.message});
}


// Body-parser middleware
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
// cors
app.use(cors());
// initialize auth
app.use(authlocal.initialize());
app.use(authjwt.initialize());
app.use(authjwtrefresh.initialize());
//app.use(passport.session());

app.get('/ping', (req, res)=>{    
    res.json({message: "ok"});
});

app.use(async (err, req, res, next) => {
    res.status(500).send({ error: err });
})

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(errorHandler);

app.listen(PORT, '0.0.0.0', (error) => {
    if(!error) {
        console.log("Server is Succesfully Running, and App is listening on port " + PORT);
    }
    else {
        console.log("Error occurred, server can't start", error);
    }
});