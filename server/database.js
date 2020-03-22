var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "namegator"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

exports.execute = function(query, values) {
	return new Promise(function (resolve, reject) {
		con.query(query, values, function (err, result, fields) {
			if (err) reject(err);
			else resolve(result);
		});
	});
}