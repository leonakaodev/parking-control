const service = require('../service');
const { AuthenticationError } = require('apollo-server');

var AuthenticationErrorMessage = 'Faça login e tente novamente';

module.exports = {
    Query: {
        async vehicles(_, args, context){
            if(!context.auth) throw new AuthenticationError(AuthenticationErrorMessage);
            return await service.getVehiclesByFinished(args.finished);
        },
        async vehicleById(_, args, context){
            if(!context.auth) throw new AuthenticationError(AuthenticationErrorMessage);
            return await service.getVehicleById(args.id);
        },
        async price(_, args, context){
            if(!context.auth) throw new AuthenticationError(AuthenticationErrorMessage);
            const value = await service.getPrice(args.id);
            return { value };
        },
        async settings(_, __, context){
            if(!context.auth) throw new AuthenticationError(AuthenticationErrorMessage);
            return await service.getSettings();
        }
    },
    Mutation: {
        async saveVehicle(_, args, context){
            if(!context.auth) throw new AuthenticationError(AuthenticationErrorMessage);
            const vehicle = args.vehicle;
            const id = await service.saveVehicle(vehicle, context.user.id);
            return await service.getVehicleById(id);
        },
        async finishVehicle(_, args, context){
            if(!context.auth) throw new AuthenticationError(AuthenticationErrorMessage);
            return await service.setVehicleFinished(args.vehicleId, context.user.id);
        },
        async removeVehicle(_, args, context){
            if(!context.auth) throw new AuthenticationError(AuthenticationErrorMessage);
            return await service.setVehicleRemoved(args.vehicleId, context.user.id);
        },
        async login(_, args){
            return await service.login(args.user, args.password);
        }
    }
};