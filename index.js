var Twit = require('twit')
var unparse = require("nearley-unparse"); //uses nearly grammar for madlibs
var grammarA = require("./grammar"); // Can update the grammar to get better lists
var grammarB = require("./Grammar-poetry"); 
var dotenv = require('dotenv').config(); //needed to protect twitter api details 


const request = require('request'); // hopefully stops heroku timeout
var reqTimer = setTimeout(function wakeUp() {
   request("https://here-we-go-again.onrender.com/", function() {
      console.log("WAKE UP DYNO");
   });
   return reqTimer = setTimeout(wakeUp, 800000);
}, 800000);


var express = require('express');
var app = express();
var port = process.env.PORT || 8080;    // Needed to ensure heroku can listen to the right port - not needed for local running
app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});

var T = new Twit({
 consumer_key:    process.env.CONSK,
  consumer_secret:     process.env.CONSS,
  access_token:         process.env.ACCESST,
  access_token_secret:  process.env.ACCESSS,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
}) 
 


if (Math.random() <0.5) {

	var	src = unparse(grammarA);

	} else {
	
	var	src = unparse(grammarB);

	}
	
T.post('statuses/update', { status: src }, function(err, data, response) {
		console.log(data)
		console.log(src)
	})


//
//  function generates a phrase from the grammar and passes it to twitter 
//

var Cycle = function() {

	if (Math.random() <0.5) {

	var	src = unparse(grammarA);

	} else {

	var	src = unparse(grammarB);

	}
	
	T.post('statuses/update', { status: src }, function(err, data, response) {
		console.log(data)
		console.log(src)
	})
}

// retweet in every 5 minutes (300,000) 6 hours (21,600,000)
setInterval(Cycle, 21600000);
