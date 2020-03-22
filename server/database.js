var mysql = require('mysql');
const env = require('./config');

var con = mysql.createConnection({
    host: env.db_host,
    user: env.db_user,
    password: env.db_pass,
    database: env.db_name
});

con.connect(function(err) {
    if (err) throw err;
    console.log('Database Connected!');
});

exports.execute = function(query, values) {
    return new Promise(function (resolve, reject) {
        con.query(query, values, function (err, result) {
            if (err) reject(err);
            else resolve(result);
        });
    });
};