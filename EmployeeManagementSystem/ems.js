var config = {
	applicationId : '315f38de-be62-4d58-900c-63702094ee1d',
	applicationRoute : 'EmployeeManagementSystem-Cloudant.eu-gb.mybluemix.net',
	applicationSecret : '18c11383bf3cb0911ccfb0b15af3031bb5d29116'
};

var express = require('express');
var bodyParser = require('body-parser');

var employee = require('./routes/employee');
var catalog = require('./routes/catalog');
var notifications = require('./routes/notifications');
var cf = require('./config/config.global');
var ibmbluemix = require('ibmbluemix');
var ibmpush = require('ibmpush');
var ibmcloudcode = require('ibmcloudcode');

var app = express();
app.use(bodyParser.json());
app.use(app.router);
app.use(express.errorHandler());

var db_ems = catalog.getCloudantDb(cf.cloudant.ems);
var db_token = catalog.getCloudantDb(cf.cloudant.token);

ibmbluemix.initialize(config);
var push = ibmpush.initializeService();

// employee's services
app.get('/employee/find/all', employee.findAll(db_ems));
app.get('/employee/find/:employeeId', employee.findByEmployeeId(db_ems));
app.get('/employee/find/status/:employeeStatus', employee.findByEmployeeByStatus(db_ems));
app.post('/employee/add', employee.add(db_ems, push));
app.post('/employee/update', employee.update(db_ems));

// token's services
app.post('/token/add', notifications.add(db_token));
app.get('/token/find/all', notifications.findAll(db_token));
app.get('/token/remove/:token', notifications.remove(db_token));

var host = (process.env.VCAP_APP_HOST || 'localhost');
var port = (process.env.VCAP_APP_PORT || 3000);
app.listen(port, host);
console.log('App started on port ' + port);