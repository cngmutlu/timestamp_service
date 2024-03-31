// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

app.get("/api/:date", function(req, res) {
  let date = new Date(req.params.date);
  if (date.getTime() !== date.getTime()) {
    if(isNaN(req.params.date)) {
      res.json({error: "Invalid Date"});
    } else {
      console.log("Valid Date");
      date = new Date(Number(req.params.date));
    }
  } else {
    console.log("Valid Date");
  }
  const unixData = date.getTime();
  const utcYear = date.getUTCFullYear();
  const utcMonth = date.getUTCMonth(); 
  const utcDay = date.getUTCDate();
  const utcDayNum = date.getUTCDay();
  const utcHour = date.getUTCHours();
  const utcMinute = date.getUTCMinutes();
  const utcSecond = date.getUTCSeconds();
  const utcData = daysOfWeek[utcDayNum] + ", " + utcDay + " " + monthsOfYear[utcMonth] + " " +
   utcYear +  " " + String(utcHour).padStart(2,'0') + ":" + String(utcMinute).padStart(2,'0') + 
   ":" + String(utcSecond).padStart(2,'0') + " GMT"; 
  res.json({unix: unixData, utc: utcData});
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
