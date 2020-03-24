const service = require('../service');

module.exports = {
    Query: {
        async vehicles(_, args){
            return await service.getVehicles(args);
        }
    }
};