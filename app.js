var Quandl = require('quandl');
var Pushover = require('node-pushover');
var config = require('../pushover/config.json');

var quandl = new Quandl({
	auth_token: "rEnXyvha9S6axD27uxvR",
	api_version: 1
});

/* ######## TO DO ########

* Clean Code
* Made it check up or down
* Change var names

*/

var blah = 0;
var sum = 0;
var iSMA = 0;
var LastClose = 0;
var distFromMA = 0;

/* 
quandl.search("CME E-mini S-and-P 500 Index Futures", {format: "json"}, function(err, response){
	console.log(err);
	console.log(response);
});

*/

quandl.dataset({source: "CHRIS", table: "CME_ES1"}, function(err,response){
	if (err)
		throw err;
	var obj = JSON.parse(response);

	for (i=0; i<20; i++){
		blah = obj.data[i][4];
		sum = sum + blah;
		console.log(blah);
	};
	iSMA = sum / 20;
	LastClose = obj.data[0][4];
//	console.log(iSMA);
	distFromMA = Math.floor(LastClose - iSMA);

	//console.log(distFromMA);

	if (distFromMA >=13){
		fncPushover("Be on the lookout; /ES is " + distFromMA + " points from the 20SMA");
	};

	
});





function fncPushover(msg){
	var push = new Pushover({
		token: config.token,
		user: config.user
	});

	// A callback function is defined:
	push.send("OpExWatch", msg, function (err, res){
		if(err){
			console.log("We have an error:");
			console.log(err);
			console.log(err.stack);
		}else{
			console.log("Message send successfully");
			console.log(res);
		}
	});
} //end fncPushover function