const { ApolloServer } = require('apollo-server');
const database = require('./database');
const env = require('./config');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');

const server = new ApolloServer({ typeDefs, resolvers });

const port = env.setup_port;
console.log('Server Running in the port: '+port);
server.listen(port);