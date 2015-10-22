var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var employee = require('./routes/employee_mysql');

var app = express();
app.use(bodyParser.json());
app.use(app.router);
app.use(express.errorHandler());
// app.use(express.static(__dirname + '/public'));

// var appInfo = JSON.parse(process.env.VCAP_APPLICATION || "{}");
var services = JSON.parse(process.env.VCAP_SERVICES || "{}");
var host = (process.env.VCAP_APP_HOST || 'localhost');
var port = (process.env.VCAP_APP_PORT || 3000);

// for using mysql database
var db = getMySqlDb();

// define services
app.get('/find/all', employee.findAll(db));
app.post('/add', employee.add(db));

// start server
app.listen(port, host);
console.log('App started on port ' + port);

// the private methods
function getMySqlDb() {
	if (process.env.VCAP_SERVICES) {
		for ( var svcName in services) {
			if (svcName.match(/^mysql/)) {
				var mysqlCreds = services[svcName][0]['credentials'];

				return db = mysql.createConnection({
					host : mysqlCreds.host,
					port : mysqlCreds.port,
					user : mysqlCreds.user,
					password : mysqlCreds.password,
					database : mysqlCreds.name
				});
			}
		}
	}

	throw new Error('can not get connection!!!');
}
