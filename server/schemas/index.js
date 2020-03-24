module.exports = `
    type User {
        id: Int
        name: String
        last_access: String
        finished: Boolean
    }

    type Vehicle {
        id: Int
        name: String
        note: String
        date: String
        hour: String
        finished: Boolean
    }

    type Setting {
        half_price: Float
        whole_price: Float
    }

    type Price {
        value: Float
    }

    type Query {
        vehicles (finished: Boolean): [Vehicle]
        vehicleById (id: Int): Vehicle
        price (id: Int): Price
    }

    input VehicleInput {
        name: String
        note: String
        created_by: Int
    }

    type Mutation {
        saveVehicle(vehicle: VehicleInput) : Vehicle
    }
`;