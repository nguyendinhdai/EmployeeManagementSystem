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
	var cloudant = {
		url : "https://85deae94-be72-4dfc-b306-c6b88da04faa-bluemix:9ac97414761b9bbb379dfdac1505c1a882f639ae9195a7f2af88412e13dffc30@85deae94-be72-4dfc-b306-c6b88da04faa-bluemix.cloudant.com"
	};

	var nano = require('nano')(cloudant.url);
	return nano.db.use('ems');
};