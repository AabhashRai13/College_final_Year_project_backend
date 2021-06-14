const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const connectDB = require('./config/db')
const passport = require('passport')
const bodyParser = require('body-parser')
var config = require('./config/dbconfig')
const movies = require('./routes/records_routes.js') ;
const users = require('./routes/index');
var jwt = require('jsonwebtoken');
connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}



app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/users', users);
app.use('/movies', validateUser, movies);
app.use(passport.initialize())
require('./config/passport')(passport)

//  function validateUser(req, res,next) {
//     if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
//         var token = req.headers.authorization.split(' ')[1]
//         var decodedtoken = jwt.decode(token, config.secret)
//         // add user id to request
//         req.body.userId = decoded.id;
//         next();
//         return res.json({success: true, msg: 'Hello ' + decodedtoken.name})
//     }
//     else {
//         return res.json({success: false, msg: 'No Headers'})
//     }
// }

function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'], config.secret, function(err, decoded) {
      if (err) {
        res.json({status:"error", message: err.message, data:null});
      }else{
        // add user id to request
        req.body.userId = decoded.id;
        next();
      }
    });
    
  }

// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function(req, res, next) {
    let err = new Error('Not Found');
       err.status = 404;
       next(err);
   });
   // handle errors
   app.use(function(err, req, res, next) {
    console.log(err);
    
     if(err.status === 404)
      res.status(404).json({message: "Not found"});
     else 
       res.status(500).json({message: "Something looks wrong :( !!!"});
   });



const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))