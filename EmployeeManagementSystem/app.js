var express = require('express');
var bodyParser = require('body-parser');

var employee = require('./routes/employee');
var catalog = require('./routes/catalog');

var app = express();
app.use(bodyParser.json());
app.use(app.router);
app.use(express.errorHandler());

var db_ems = catalog.getCloudantDb('ems');

// define services
app.get('/find/all', employee.findAll(db_ems));
app.get('/find/:employeeId', employee.findByEmployeeId(db_ems));
app.post('/add', employee.add(db_ems));

// the IP address of the Cloud Foundry DEA (Droplet Execution Agent) that hosts
// this application:
var host = (process.env.VCAP_APP_HOST || 'localhost');
// the port on the DEA for communication with the application:
var port = (process.env.VCAP_APP_PORT || 3000);

// start server
app.listen(port, host);
console.log('App started on port ' + port);