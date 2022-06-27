const { getDb, getNextSequence } = require('../db');

const list = async () => {
  const db = getDb();
  const users = await db.collection('users').find({}).toArray();
  return users;
};

const search = async (_, { input: { sub } }) => {
  const db = getDb();
  // creat filter
  let filter = {};
  if (sub) {
    filter.sub = sub;
  }

  const findUserById = await db.collection('users').find(filter).toArray();
  console.log(filter);
  return findUserById;
};

const create = async (_, { user }) => {
  const db = getDb();
  const newUser = Object.assign({}, user);
  const insertUser = await db.collection('users').insertOne(newUser);
  return insertUser;
};

module.exports = {
  list,
  search,
  create,
};
