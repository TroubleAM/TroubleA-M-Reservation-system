var mongoose=require('mongoose');

var Schema=mongoose.Schema;

//database name is "admins".

mongoose.connect('mongodb://reservationSys:no94@ds113935.mlab.com:13935/reservationsys',function(err,data){
	if(err){
		console.log(err)
	}
	console.log('connect with db');
});

var adminsSchema= new Schema({
	username: {
		type: String,
		required: true
	},
 	password: {
 		type: String,
 		required: true
 	},
 	phoneNumber:{
 		type:Number,
 		required:true
 	},
 	specilization:{
 		type:String,
 		require:true
 	},
 	availableAppointments:{
 		type: Array
 	},
 	reservedAppointments:{
 		type:Array
 	},
	image:{
		type: String
	},
	location:{
		type:String
	},
	reviews:{
		type:Array
	}
});

var admins = mongoose.model ('admins', adminsSchema);

module.exports = admins;
