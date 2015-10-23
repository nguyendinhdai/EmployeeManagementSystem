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
		var services = JSON.parse(process.env.VCAP_SERVICES || "{}");
		for ( var svcName in services) {
			if (svcName.match(/^cloudantNoSQLDB/)) {
				var cloudant = services[svcName][0].credentials;

				var nano = require('nano')(cloudant.url);
				return nano.db.use('ems');
			}
		}
	}

	throw new Error('can not get connection!!!');
};