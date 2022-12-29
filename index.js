// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { json } = require('express');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('api/timestamp', (req, res) => {

})
app.get('/api/timestamp/:date?', (req, res) => {
  const queryDatefromApi = req.params.date;
  if (queryDatefromApi === undefined) {
    let newDate = new Date();
    res.json({ unix: newDate.valueOf(), unix: newDate });
  } else {
    let dateRegex = /^[0-9]+-\d{1,2}-\d{1,2}/gm;
    let numRegex = /^[0-9]+/gm;
    let checkdate = dateRegex.test(queryDatefromApi);
    let checknum = numRegex.test(queryDatefromApi);
    if (checkdate === true) {
      let format = new Date(queryDatefromApi);
      return res.json({ unix: format.valueOf(), utc: format });
    } else if (checknum === true) {
      let convertedDate = parseInt(queryDatefromApi);
      let newDate = new Date(convertedDate);
      return res.json({ unix: convertedDate, utc: newDate });
    } else {
      res.json({ message: "Invalid Time" });
    }
  }
})
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});



// listen for requests :)
const PORT = process.env.PORT;
var listener = app.listen(5000, function () {
  console.log('Your app is listening on port ' + 5000);
});
