exports.findAll = function(db) {
	return function(req, res) {
		var sql = 'SELECT * FROM employee';
		db.query(sql, function(err, result) {
			if (err)
				res.send("ERROR:" + err);

			res.send(result);
		});
	}
}

exports.add = function(db) {
	return function(req, res) {
		var data = req.body;
		res.setHeader('Content-Type', 'application/json');

		var sql = 'INSERT INTO employee(employee_id, full_name, age) VALUES(?, ?, ?)';
		db.query(sql, [ data.employee_id, data.full_name, data.age ], function(
				err, result) {
			if (err)
				res.json({
					"ERROR" : err
				});

			res.json({
				'action' : 'data created'
			});
		});
	}
}