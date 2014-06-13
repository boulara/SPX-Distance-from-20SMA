var Quandl = require('quandl');

var quandl = new Quandl({
	auth_token: "rEnXyvha9S6axD27uxvR",
	api_version: 1
});

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
		console.log(sum);
	}
iSMA = sum / 20;
LastClose = obj.data[0][4];

distFromMA = Math.floor(LastClose - iSMA);


if (distFromMA <=40) {
	//code to send pushover
}
console.log(distFromMA);
	
});