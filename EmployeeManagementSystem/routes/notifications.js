exports.justForTest = function(msg) {
	exports.log(msg);
};

exports.log = function(msg) {
	console.log(msg);
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
	var sender = new gcm.Sender("API_KEY");

	// registration of device ids
	var registrationIds = [];

	if (registrationIds.length === 0) {
		console
				.log("No device is registered. The notification cannot be sent.");
	} else {
		sender.send(message, registrationIds, 4, function(err, result) {
			console.log(result);
		});
	}
};

exports.regToken = function(db) {
	return function(req, res) {
		var data = req.body;
		res.setHeader('Content-Type', 'application/json');

		db.insert(data, function(err, body, header) {
			if (!err) {
				res.json({
					'action' : 'data created'
				});
			} else {
				res.json({
					"ERROR" : err
				});
			}
		});
	};
};