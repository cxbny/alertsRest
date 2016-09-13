// server.js

// call the packages we need
var gzippo = require('gzippo');

var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var fs = require('fs');
var alertsTypeService = require('./alertsTypeService.js');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 5000;
var alertsTypeUrl = __dirname + '/model/alertsType.json';
var alertsUrl = __dirname + '/model/alerts.json';

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");
  // do logging, validation,
  console.log('Receive an incoming request');

  next(); // make sure we go to the next routes and don't stop here
});

// on routes that end in /alertsType
// ----------------------------------------------------
router.route('/alertsType')

  // Create an alerts type
  .post(function(req, res) {
    fs.readFile(alertsTypeUrl, 'utf8', function (err, data) {
      data = JSON.parse( data );

      // New alerts type setup
      var lastId = (data.length === 0 ? 0 : data[data.length - 1].id);
      data.push({
        "id": parseInt(lastId) + 1,
        "text": req.body.text
      });

      fs.writeFile(alertsTypeUrl, JSON.stringify(data), 'utf8', function(err) {
        if (err) throw err;
        console.log('data is saved --- ' + JSON.stringify(data));
      });

      res.end( JSON.stringify(data) );
    });
  })

  // Get all alerts types
  .get(function (req, res) {
    alertsTypeService.getAll().then(function(data) {
      res.end( data );
    });
  })
  ;

// on routes that end in /alertsType/:id
// ----------------------------------------------------
router.route('/alertsType/:id')

  // Delete an alerts type
  .delete(function(req, res) {
    var alertsId = req.params.id;
    console.log("Delete an alerts type for alertsId " + alertsId);

    fs.readFile(alertsTypeUrl, 'utf8', function (err, data) {
      data = JSON.parse( data );
      var index = data.findIndex(function(obj) {
        return obj.id == alertsId;
      });

      console.log("index of alerts ID " + index);

      if (index != -1) {
        data.splice(index, 1);
        fs.writeFile(alertsTypeUrl, JSON.stringify(data), 'utf8', function(err) {
          if (err) throw err;
          console.log('data is saved --- ' + JSON.stringify(data));
        });
      }

      res.end( JSON.stringify(data) );
    });
  })

  // Update an alerts type
  .put(function(req, res) {
    var alertsId = req.params.id;
    console.log("Update an alerts type for alertsId " + alertsId);

    fs.readFile(alertsTypeUrl, 'utf8', function (err, data) {
      data = JSON.parse( data );
      var index = data.findIndex(function(obj) {
        return obj.id == alertsId;
      });

      if (index != -1) {
        data[index] = {
          "id": parseInt(alertsId),
          "text": req.body.text
        };

        fs.writeFile(__dirname + '/model/alertsType.json', JSON.stringify(data), 'utf8', function(err) {
          if (err) throw err;
          console.log('data is saved --- ' + JSON.stringify(data));
        });
      }

      res.end( JSON.stringify(data) );
    });

  })

  // Get an alerts type by ID
  .get(function (req, res) {
    var alertsId = req.params.id;
    console.log("Get alerts type for alertsId " + alertsId);

    fs.readFile(alertsTypeUrl, 'utf8', function (err, data) {
      data = JSON.parse( data );

      // Search for alerts type
      var alertsType = data.find(function(obj) {
        return obj.id == alertsId;
      });

      res.end( JSON.stringify(alertsType) );
    });
  })
  ;

// on routes that end in /alertsType
// ----------------------------------------------------
router.route('/alerts')

  // Create an alert
  .post(function(req, res) {

    fs.readFile(alertsUrl, 'utf8', function (err, data) {
      data = JSON.parse( data );

      // New alerts type setup
      var lastId = (data.length === 0 ? 0 : data[0].id);
      data.unshift({
        "id": parseInt(lastId) + 1,
        "alertType": req.body.alertType,
        "created": new Date()
      });

      fs.writeFile(alertsUrl, JSON.stringify(data), 'utf8', function(err) {
        if (err) throw err;
        console.log('data is saved --- ' + JSON.stringify(data));
      });

      res.end( JSON.stringify(data) );
    });
  })

  // Get all alert
  .get(function (req, res) {
    fs.readFile(alertsUrl, 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
    });
  })
  ;

// REGISTER OUR ROUTES -------------------------------
// define root URL
// all of our routes will be prefixed with /api
app.use('/api/v1', router);
app.use(gzippo.staticGzip("" + __dirname + "/dist"));

// START THE SERVER
// =============================================================================
var server = app.listen(port, function () {
   var host = server.address().address;
   var port = server.address().port;

   console.log("Example app listening at http://%s:%s", host, port);
});
