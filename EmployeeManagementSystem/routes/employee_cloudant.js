exports.findAll = function(db) {
	return function(req, res) {
		res.send("TODO: comming soon!!!");
	};
};

exports.add = function(db) {
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