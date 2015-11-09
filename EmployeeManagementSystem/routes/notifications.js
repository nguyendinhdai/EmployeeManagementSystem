exports.justForTest = function(msg) {
	exports.log(msg);
};

exports.log = function(msg) {
	console.log(msg);
};

exports.sendPush = function(push, employee_id) {
	var message = {
		alert : "{\"mess\":\"Have an employee added to system, please review it and approval or reject the Employee!\",\"employee_id\":\""+employee_id+"\"}",
		url : "https://www.bluemix.net"
	};

	push.sendBroadcastNotification(message).then(function(response) {
		console.log(response);
	}, function(err) {
		console.log(err);
	});
};

exports.sendNotifications = function(msg) {
	var gcm = require('node-gcm');

	console.log("send a message....");

	var message = new gcm.Message({
		collapseKey : 'demo',
		delayWhileIdle : true,
		timeToLive : 3,
		data : {
			notification : msg
		}
	});

	// TODO please provide the API_KEY
	var sender = new gcm.Sender("AIzaSyB9iXYvWIDW8AqYq2UUdOvMh_Mr2SGiKIM");

	// registration of device ids
	var registrationIds = [ 'bf725c60-4886-3b08-9690-6b9fad9589cc' ];

	if (registrationIds.length === 0) {
		console
				.log("No device is registered. The notification cannot be sent.");
	} else {
		sender.send(message, registrationIds, 4, function(err, result) {
			console.log(result);
		});
	}
};

exports.add = function(db) {
	return function(req, res) {
		var data = req.body;
		res.setHeader('Content-Type', 'application/json');

		db.insert(data, function(err, body, header) {
			if (!err) {
				res.json({
					'status' : 'created'
				});
			} else {
				res.json({
					'status' : err
				});
			}
		});
	};
};

exports.remove = function(db) {
	return function(req, res) {
		res.setHeader('Content-Type', 'application/json');

		var token = req.param('token');
		db.view('views', 'find_all', function(err, body) {
			if (err) {
				res.json({
					"status" : err
				});
			} else {
				var rows = body.rows;
				rows.forEach(function(row) {
					var data = row.key;
					if (data.token === token) {
						db.destroy(row.id, data._rev, function(err, body) {
							if (!err) {
								res.json({
									'status' : 'removed'
								});
							} else {
								res.json({
									'status' : err
								});
							}
						});
					} else {
						res.json({
							'status' : 'Notfound'
						});
					}
				});
			}
		});
	};
};

exports.findAll = function(db) {
	return function(req, res) {
		db.view('views', 'find_all', function(err, tokens) {
			if (err) {
				res.send("ERROR:" + err);
			}

			res.send(tokens);
		});
	};
};