var express = require('express');
var bodyParser = require('body-parser');

var employee = require('./routes/employee');
var catalog = require('./routes/catalog');

var app = express();
app.use(bodyParser.json());
app.use(app.router);
app.use(express.errorHandler());

var db = catalog.getCloudantDb();

// define services
app.get('/find/all', employee.findAll(db));
app.get('/find/:employeeId', employee.findByEmployeeId(db));
app.post('/add', employee.add(db));

// the IP address of the Cloud Foundry DEA (Droplet Execution Agent) that hosts
// this application:
var host = (process.env.VCAP_APP_HOST || 'localhost');
// the port on the DEA for communication with the application:
var port = (process.env.VCAP_APP_PORT || 3000);
// start server
app.listen(port, host);
console.log('App started on port ' + port);