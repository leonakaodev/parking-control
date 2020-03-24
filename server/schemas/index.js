const typeUser = require('./users');
const typeVehicle = require('./vehicles');
const typeSetting = require('./settings');

const typeDefs = `
    ${typeUser}

    ${typeVehicle}

    ${typeSetting}

    type Query {
        vehicles (finished: Boolean): [Vehicle]
    }
`;

module.exports = typeDefs;