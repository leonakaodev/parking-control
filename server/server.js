const { ApolloServer } = require('apollo-server');
const env = require('./config');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');

const server = new ApolloServer({ typeDefs, resolvers });

const port = env.setup_port;
console.log('Server Running in the port: '+port);
server.listen(port);