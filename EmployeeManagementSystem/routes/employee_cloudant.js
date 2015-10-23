exports.findAll = function(db) {
	return function(req, res) {
		db.view('views', 'find_all', function(err, employees) {
			if (err) {
				res.send("ERROR:" + err);
			}

			res.send(employees);
		});
	};
};

exports.findByEmployeeId = function(db) {
	return function(req, res) {
		var employeeId = req.param('employeeId');

		db.view('views', 'find_all', function(err, body) {
			if (err) {
				res.send("ERROR:" + err);
			}

			var rows = body.rows;
			rows.forEach(function(row) {
				var data = row.key;
				if (data.employee_id === employeeId) {
					res.send(data);
				}
			});
			
			res.send("Not found!!");
		});

//		db.list(function(err, body) {
//			if (!err) {
//				var rows = body.rows;
//				rows.forEach(function(row) {
//					db.get(row.id, function(err, data, headers) {
//						if (err) {
//							res.send("ERROR:" + err);
//						}
//
//						if (data.employee_id === employeeId) {
//							res.send(data);
//						}
//					});
//				});
//			} else {
//				res.send("ERROR:" + err);
//			}
//		});

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