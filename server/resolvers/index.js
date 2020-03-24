const vehiclesQueries = require('./vehicles/queries');

module.exports = {
    Query: {
        ...vehiclesQueries,
    }
};