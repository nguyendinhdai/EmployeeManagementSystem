// There are many useful environment variables available in process.env,
// please refer to the following document for detailed description:
// http://ng.w3.bluemix.net/docs/FAQ.jsp#env_var

// VCAP_SERVICES contains all the credentials of services bound to
// this application. For details of its content, please refer to
// the document or sample of each service.

exports.getMySqlDb = function() {
	if (process.env.VCAP_SERVICES) {
		var services = JSON.parse(process.env.VCAP_SERVICES || "{}");
		for ( var svcName in services) {
			if (svcName.match(/^mysql/)) {
				var mysqlCreds = services[svcName][0].credentials;

				var mysql = require('mysql');
				return mysql.createConnection({
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
};

exports.getCloudantDb = function() {
	if (process.env.VCAP_SERVICES) {
		// get service credentials and communicate with bluemix services.
		var services = JSON.parse(process.env.VCAP_SERVICES || "{}");
		for ( var svcName in services) {
			if (svcName.match(/^cloudantNoSQLDB/)) {
				// add a Cloudant NoSQL DB service.
				var cloudant = services[svcName][0].credentials;

				var nano = require('nano')(cloudant.url);
				return nano.db.use('ems');
			}
		}
	}

	throw new Error('can not get connection!!!');
};