const database = require('./database');

exports.getVehicles = function(args) {
    return database.execute(`SELECT id, name, note, cast(created_at as date) as date, cast(created_at as time) as hour
                                FROM vehicles
                                WHERE removed = 0`);
};