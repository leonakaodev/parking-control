const database = require('./database');
const crypto = require('crypto');

const msToTime = function (duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    return hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
};

const calculatePrice = async function(date){
    const dateNow = new Date();
    date = new Date(date);
    const time = Math.abs(dateNow - date) / 36e5;
    const fullhours = Math.floor(time);
    const minutes = time % 1;
    const { whole_price, half_price } = await settings();
    var value = fullhours * whole_price;
    value += minutes > 0.5 ? whole_price : half_price;
    return {
        value,
        time: msToTime(time)
    };
};

const settings = async function() {
    const [result] = await database.execute('SELECT whole_price, half_price FROM settings');
    return result;
};

exports.getVehicles = function() {
    return database.execute('SELECT id, name, note, cast(cast(created_at as date) as char) as date, cast(created_at as time) as hour FROM vehicles WHERE removed = 0');
};

exports.getVehiclesByFinished = function(finished) {
    return database.execute('SELECT id, name, note, cast(cast(created_at as date) as char) as date, cast(created_at as time) as hour FROM vehicles WHERE removed = 0 AND finished = ?', [finished]);
};

exports.getVehicleById = async function(id) {
    const [result] = await database.execute('SELECT id, name, note, cast(cast(created_at as date) as char) as date, cast(created_at as time) as hour FROM vehicles WHERE removed = 0 AND id = ?', [id]);
    return result;
};

exports.saveVehicle = async function(vehicle, user) {
    const result = await database.execute('INSERT INTO vehicles (name, note, created_by) VALUES ?', [[[vehicle.name, vehicle.note, user]]]);
    return result.insertId;
};

exports.setVehicleFinished = async function(id, user) {
    const result = await database.execute('UPDATE vehicles SET finished = 1, finished_by = ?, updated_by = ? WHERE id = ?', [user, user, id]);
    return result.affectedRows > 0;
};

exports.setVehicleRemoved = async function(id, user) {
    const result = await database.execute('UPDATE vehicles SET removed = 1, removed_by = ?, updated_by = ? WHERE id = ?', [user, user, id]);
    return result.affectedRows > 0;
};

exports.getPrice = async function(vehicle) {
    const [result] = await database.execute('SELECT created_at FROM vehicles WHERE removed = 0 AND id = ?', [vehicle]);
    const date = result.created_at;
    return calculatePrice(date);
};

exports.getSettings = async function() {
    return await settings();
};

exports.login = async function(user, password) {
    const [result] = await database.execute('SELECT id, name, password FROM users WHERE username = ?', [user]);
    password = crypto.createHash('md5').update(password).digest('hex');
    if(result && password === result.password) {
        const { id, name } = result;
        const time = Date.now();
        const base = time + 'nko' + result.id;
        const hash = crypto.createHash('md5').update(base).digest('hex');
        database.execute('UPDATE users SET hash = ?, last_access = now() WHERE id = ?', [hash, id]);
        return {
            id,
            name,
            hash
        };
    } else {
        return null;
    }
};

exports.getUserByHash = async function(hash) {
    const [user] = await database.execute('SELECT id, name FROM users WHERE hash = ?', [hash]);

    return user;
};