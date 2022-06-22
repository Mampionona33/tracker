const { ApolloServer } = require('apollo-server-express');
const fs = require('fs');
const pathResolver = require('path');
require('dotenv').config();

const resolvers = {
  Query: {},
  Mutation: {},
};

const apolloServer = new ApolloServer({
  typeDefs: fs.readFileSync(
    pathResolver.join(__dirname, 'schema/schema.graphql'),
    'utf-8'
  ),
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

async function installHandler(app) {
  await apolloServer.start();
  const enableCros = (process.env.ENABLE_CORS || 'true') === 'true';
  console.log('CORS setting: ', enableCros);
  apolloServer.applyMiddleware({ app, path: '/graphql', cors: enableCros });
}

module.exports = { installHandler };
