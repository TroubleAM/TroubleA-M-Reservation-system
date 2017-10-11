var express = require('express');
var mongoose = require('mongoose');

//MiddleWare
var morgan = require('morgan');
var bodyParser = require('body-parser');


var app = express();
var db = require('./Database/db');
var session = require('express-session')


var jwt = require('jwt-simple');
var multer = require('multer');
var upload = multer({
    dest: './FrontEnd/uploads/'
}); //fix this


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


//make session
app.use(session({
    secret: "asynco",
    resave: false,
    saveUninitialized: true
}));


// static files inside FrontEnd folder
app.use(express.static(__dirname + '/./FrontEnd'));

// check if doctor loggin
app.get('/checkIsLoggedIn', (req, res) => {
  var checker = (!!req.session.username) ? 'true' : 'false';
  console.log('checking isLoggedIn --------------->', !!req.session.username, checker);
  res.send(checker);
});


// client page 
app.get('/index', (req, res) => {
  res.redirect('/index.html')
})


//add reservedAppoinment 
// app.post('/reservedappointments', function(req, res) {

//     var patient = {
//         patientName: req.body.patientName,
//         phoneNumber: req.body.phoneNumber,
//     };
//     var newpatient = new db(patient);
//     newpatient.save()
//     .then(item => {
//         res.send("item saved to database")
//     })
//     .catch(err => {
//         res.status(400).send("unable to save to database")
//     })
// });

// get login page 
app.get('/login', function(req, res) {
    res.redirect('./views/login.html')
})

// Get all doctors
app.get('/getDoctors', (req, res) => {
    db.find({}, (err, data) => {
        if (err) console.log(err);
        // console.log('------------> all users', data);
        res.send(data);
    });
});
// End TEST
// Get specific doctor
app.post('/getDoctorData', (req, res) => {
    // console.log('********************>', req.body.doctorName);
    db.findOne({
        username: req.body.doctorName
    }, (err, data) => {
        if (err) console.log(err);
        res.send(data);
    });
});

// Load reserved appointments
app.get('/getDoctorReservedAppointments', (req, res) => {
    // console.log('********************>', req.body.doctorName);
    db.findOne({
        username: req.session.username
    }, (err, data) => {
        if (err) console.log(err);
        res.send(data);
    });
});



// Login page form
app.post('/login', function(req, res) {
    console.log('--------$$$$---->login', req.session)
    var username = req.body.username;
    var password = req.body.password;
    // var salt = bcrypt.genSaltSync(10);
    // var hash = bcrypt.hashSync(password, salt);
    db.findOne({
        username: username
    }, function(err, user) {
        if (err) {
            console.log(err)
            return res.status(404).send();
        }
        if (!user) {
            return res.status(404).send();
        }
        else {
            // Create session
            if(password=== user.password){
                req.session.username = user.username;
                console.log('---------------------> ', req.session);
                res.redirect('/index') 
            }else{
                res.redirect('/login')

            }
        }
    })

});

// // Logout endpoint
app.get('/logout', function(req, res) {
  req.session.username = null;
  console.log('->>>>>>>>>>>>>', req.session);
  res.redirect('/login');
});

// Sign Up  form POST 
// multer model for download image 
app.post('/signup', upload.any(), function(req, res) {
    var adduser = {
        username: req.body.username,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        specilization: req.body.specilization,
        // image: req.files[0].filename,
        location:req.body.location
    };
    console.log(adduser.image);
    var user = new db(adduser);
    user.save()
    .then(item => {
        res.redirect("/login")
    })
    .catch(err => {
        res.status(400).send("unable to save to database")
    })
});

// Sign Up GET
app.get('/signup', function(req, res) {
    /* body... */
    res.redirect('/views/signup.html');
});

// Add an appointment to doctor 
app.put('/addAppointments', function(req, res) {
    console.log('-------- addappointments', req.body, '*******', req.session.username)
    db.update({
        username: req.session.username
    }, {
        $push: {
            availableAppointments: req.body.newAppointment
        }
    }, function(err, updateUser) {
        if (err) {
            console.log('error')
        } else {
            res.send(updateUser)
        }
    })
});

// Reserve an appointment from client 
app.put('/reservedappointments', function(req, res) {
    console.log('req.body ------->', req.body)
    var fullAppointment = req.body.reservedAppointment.availableAppointments.split(' ');
    var theAppointment = {
      time: fullAppointment[0],
      date: fullAppointment[1]
  }
  req.body.reservedAppointment.availableAppointments = theAppointment;
  db.update({
    username: req.body.username
}, {
    $pull: {
        availableAppointments: req.body.reservedAppointment.availableAppointments
    }
}, function(err, updateUser) {
    if (err) {
        console.log(err)
    } else {

        console.log('pull successfully', updateUser)
        console.log(updateUser)
    }
});
  db.update({
    username: req.body.username
}, {
    $push: {
        reservedAppointments: req.body.reservedAppointment
    }
}, function(err, updateUser) {
    if (err) {
        console.log(err)
    } else {
        console.log('push to reservedAppointments')
        console.log(updateUser)
    }
})
  res.send("updateUser")
})

app.post('/sendReview',function(req,res){
    var review=req.body.review;
      db.update({
    username: req.body.username
}, {
    $push: {
        reviews:review
    }
},function(err,data){
    if(err){
        console.log(err)
    } else {
        console.log('updated user: ',data)
    }
})
})

app.get('/getreviews',function(req,res){
    db.findOne({
        username:req.session.username
    },function(err,data){
        if(err){
            console.log(err);
        }
            console.log(err);
            res.send(data);
    })
}) 



 // delete reserved appoinment 
 app.delete('/deleteAppointment' , function (req , res) {
    /* body... */
    console.log('***********>>', req.body, req.session.username)
    var theAppointment = {
        availableAppointments: req.body.reservedAppointment.availableAppointments,
        patientName: req.body.reservedAppointment.patientName,
        patientPhone: req.body.reservedAppointment.patientPhone
    }
    req.body.reservedAppointment = theAppointment;
    console.log('xxxxxxxxxxxxx>', req.body.reservedAppointment)
    db.update({
        username: req.session.username
    }, {
        $pull: {
            reservedAppointments: req.body.reservedAppointment
        }
    }, function(err, updateUser) {
        if (err) {
            console.log(err)
        } else {

            console.log('pull successfully', updateUser)
            console.log(updateUser)
        }
    });
}) //if we have time we will fix it

// app.post('/doctorReply',function(req,res){
//     db.update({username:req.session.username},function(err,data){
//         if(err){ console.log(err)}
//         for (var i = 0; i < data.reservedAppointments.length; i++) {
//             if(data.reservedAppointments[i].patientName === req.body.patientName){
//                 data.reservedAppointments[i].reply = req.body.reply;
//             }
//         }
//     })
// })

app.post('/doctorReply', function(req,res){
   db.update({'reservedAppointments.patientName': req.body.patientName},
       {'$set': {
           'reservedAppointments.$.reply': req.body.reply,
       }},
           function(err,model) {
               if(err){
                   console.log(err);
                   return res.send(err);
               }
               return res.json(model);
       });
})




//************************************
// listen to port 2036 
var port = process.env.PORT || 3000
app.listen(port, () => {
    console.log('Server listening on port ', port)
});

