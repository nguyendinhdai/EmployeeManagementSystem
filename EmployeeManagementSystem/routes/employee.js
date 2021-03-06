exports.findAll = function(db_ems) {
	return function(req, res) {
		db_ems.view('views', 'find_all', function(err, employees) {
			if (err) {
				res.send("ERROR:" + err);
			}

			res.send(employees);
		});
	};
};

exports.findByEmployeeByStatus = function(db) {
	return function(req, res) {
		var employeeStatus = req.param('employeeStatus');

		var view_name = "employee_" + employeeStatus;
		db.view('views', view_name, function(err, employees) {
			if (err) {
				res.json({
					'status' : err
				});
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

			res.send("Notfound");
		});
	};
};

exports.update = function(db) {
	return function(req, res) {
		res.setHeader('Content-Type', 'application/json');

		var params = req.body;
		var employee_id = params.employee_id;
		db.view('views', 'find_all', function(err, body) {
			if (err) {
				res.json({
					'status' : err
				});
			}

			var exists = false;

			var rows = body.rows;
			rows.forEach(function(row) {
				var data = row.key;
				if (data.employee_id === employee_id) {
					exists = true;

					data.status = params.status;
					db.insert(data, function(err, body) {
						if (!err) {
							res.json({
								'status' : 'updated'
							});
						} else {
							res.json({
								'status' : err
							});
						}
					});
				}
			});

			if (!exists) {
				res.json({
					'status' : "Notfound"
				});
			}
		});
	};
};

exports.add = function(db, push) {
	return function(req, res) {
		var data = req.body;
		res.setHeader('Content-Type', 'application/json');
		
//		console.log('data.employee_id' + data.employee_id);
//		require('./notifications').sendPush(push, data.employee_id);
//		res.json({
//			'status' : 'created'
//		});
		
		db.insert(data, function(err, body, header) {
			if (!err) {
				require('./notifications').sendPush(push, data.employee_id);
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