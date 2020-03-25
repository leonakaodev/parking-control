const { ApolloServer } = require('apollo-server');
const env = require('./config');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');
const context = require('./service/context');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context
});

const port = env.setup_port;
console.log('Server Running in the port: '+port);
server.listen(port);