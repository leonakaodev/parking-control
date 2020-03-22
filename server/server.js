const { ApolloServer } = require('apollo-server');
const database = require('./database');
const env = require('./config');

const typeDefs = `
    type Vehicle {
        id: Int
        name: String
        note: String
        date: String
        hour: String
        finished: Boolean
    }

    type Query {
        vehicles (finished: Boolean): [Vehicle]
    }
`;

const resolvers = {
    Query: {},
};

const server = new ApolloServer({ typeDefs, resolvers });

const port = env.setup_port;
console.log('Server Running in the port: '+port);
server.listen(port);