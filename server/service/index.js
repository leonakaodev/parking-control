const database = require('./database');

exports.getVehicles = function() {
    return database.execute('SELECT id, name, note, cast(created_at as date) as date, cast(created_at as time) as hour FROM vehicles WHERE removed = 0');
};

exports.getVehiclesByFinished = function(finished) {
    return database.execute('SELECT id, name, note, cast(created_at as date) as date, cast(created_at as time) as hour FROM vehicles WHERE removed = 0 AND finished = ?', [finished]);
};

exports.getVehicleById = async function(id) {
    const result = await database.execute('SELECT id, name, note, cast(created_at as date) as date, cast(created_at as time) as hour FROM vehicles WHERE removed = 0 AND id = ?', [id]);
    return result[0];
};

exports.saveVehicle = async function(vehicle) {
    const result = await database.execute('INSERT INTO vehicles (name, note, created_by) VALUES ?', [[[vehicle.name, vehicle.note, vehicle.created_by]]]);
    return result.insertId;
};