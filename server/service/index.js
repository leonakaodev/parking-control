const database = require('./database');

const calculatePrice = async function(date){
    const dateNow = new Date();
    date = new Date(date);
    const time = Math.abs(dateNow - date) / 36e5;
    const fullhours = Math.floor(time);
    const minutes = time % 1;
    const { whole_price, half_price } = await settings();
    var price = fullhours * whole_price;
    price += minutes > 0.5 ? whole_price : half_price;
    return price;
};

const settings = async function() {
    const result = await database.execute('SELECT whole_price, half_price FROM settings');
    return result[0];
};

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

exports.getPrice = async function(vehicle) {
    const result = await database.execute('SELECT created_at FROM vehicles WHERE removed = 0 AND id = ?', [vehicle]);
    const date = result[0].created_at;
    return calculatePrice(date);
};

exports.getSettings = async function() {
    return await settings();
};