module.exports = `
    type User {
        id: Int
        name: String
        hash: String
    }

    type Vehicle {
        id: Int
        name: String
        note: String
        date: String
        finished: Boolean
    }

    type Settings {
        half_price: Float
        whole_price: Float
    }

    type Price {
        time: String
        value: Float
    }

    type Query {
        vehicles (finished: Boolean): [Vehicle]
        vehicleById (id: Int): Vehicle
        price (id: Int): Price
        settings: Settings
    }

    input VehicleInput {
        name: String
        note: String
    }

    type Mutation {
        saveVehicle(vehicle: VehicleInput): Vehicle
        finishVehicle(vehicleId: Int): Boolean
        removeVehicle(vehicleId: Int): Boolean
        login(user: String, password: String): User
    }
`;