const { ApolloServer } = require("apollo-server");

const server = new ApolloServer({ typeDefs, resolvers });

console.log("Server Running");
server.listen();