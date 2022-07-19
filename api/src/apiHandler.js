const { ApolloServer, gql } = require('apollo-server-express');
const jwtDecode = require('jwt-decode');
const fs = require('fs');
const pathResolver = require('path');
require('dotenv').config();

const users = require('./schema/user');
const task = require('./schema/task');
const { query } = require('express');
const { getDb } = require('./db');
const { MongoClient } = require('mongodb');

const resolvers = {
  Query: {
    // get all user list
    listUser: users.list,
    // get one user by id
    searchUser: users.search,
    getUserTask: task.get,
    getUserTaskByFilter: task.getUserTaskByFilter,
    getTaskByDate: task.getTaskByDate,
  },
  Mutation: {
    // create new user
    creatUser: users.create,
    createTask: task.create,
    updateTask: task.update,
  },
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
  csrfPrevention: true,
  context: async ({ req, res }) => {
    // uncomment this on production
    // Get the user token from the headers.
    // const token = req.headers.authorization || '';
    // // Try to retrieve a user with the token
    // const decodedToken = jwtDecode(token);
    // const getUser = async () => {
    //   const url = process.env.DB_URL;
    //   const client = new MongoClient(url, { useNewUrlParser: true });
    //   const db = client.db();
    //   return db.collection('users').find({ sub: decodedToken.sub }).toArray();
    // };
    // const user = await getUser();
    // // console.log(user);
    // // adding user from database to the context
    // return user;
  },
});

async function installHandler(app) {
  await apolloServer.start();
  const enableCros = (process.env.ENABLE_CORS || 'true') === 'true';
  console.log('CORS setting: ', enableCros);
  apolloServer.applyMiddleware({ app, path: '/graphql', cors: enableCros });
}

module.exports = { installHandler };
