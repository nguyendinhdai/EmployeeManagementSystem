var express = require('express');
var bodyParser = require('body-parser');

var employee = require('./routes/employee');
var catalog = require('./routes/catalog');
var notifications = require('./routes/notifications');

var app = express();
app.use(bodyParser.json());
app.use(app.router);
app.use(express.errorHandler());

var db_ems = catalog.getCloudantDb('ems');
var db_token = catalog.getCloudantDb('token');

// employee's services
app.get('/employee/find/all', employee.findAll(db_ems));
app.get('/employee/find/:employeeId', employee.findByEmployeeId(db_ems));
app.post('/employee/add', employee.add(db_ems));

// token's services
app.post('/token/add', notifications.add(db_token));
app.get('/token/find/all', notifications.findAll(db_token));
app.get('/token/remove/:token', notifications.remove(db_token));

// the IP address of the Cloud Foundry DEA (Droplet Execution Agent):
var host = (process.env.VCAP_APP_HOST || 'localhost');
// the port on the DEA for communication with the application:
var port = (process.env.VCAP_APP_PORT || 3000);

// start server
app.listen(port, host);
console.log('App started on port ' + port);