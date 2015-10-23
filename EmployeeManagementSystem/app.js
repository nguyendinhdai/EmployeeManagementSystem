var express = require('express');
var bodyParser = require('body-parser');

// var employee = require('./routes/employee_mysql');
var employee = require('./routes/employee_cloudant');
var catalog = require('./routes/catalog');

var app = express();
app.use(bodyParser.json());
app.use(app.router);
app.use(express.errorHandler());

// var db = catalog.getMySqlDb();
var db = catalog.getCloudantDb();

// define services
app.get('/find/all', employee.findAll(db));
app.get('/find/:employeeId', employee.findByEmployeeId(db));
app.post('/add', employee.add(db));

// start server
var host = (process.env.VCAP_APP_HOST || 'localhost');
var port = (process.env.VCAP_APP_PORT || 3000);
app.listen(port, host);
console.log('App started on port ' + port);