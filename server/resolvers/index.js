const service = require('../service');

module.exports = {
    Query: {
        async vehicles(_, args){
            return await service.getVehiclesByFinished(args.finished);
        },
        async vehicleById(_, args){
            return await service.getVehicleById(args.id);
        },
        async price(_, args){
            const value = await service.getPrice(args.id);
            return { value };
        },
        async settings(){
            return await service.getSettings();
        }
    },
    Mutation: {
        async saveVehicle(_, args){
            const vehicle = args.vehicle;
            const id = await service.saveVehicle(vehicle);
            return await service.getVehicleById(id);
        },
        async finishVehicle(_, args){
            return await service.setVehicleFinished(args.vehicleId);
        },
        async removeVehicle(_, args){
            return await service.setVehicleRemoved(args.vehicleId);
        },
        async login(_, args){
            return await service.login(args.user, args.password);
        }
    }
};