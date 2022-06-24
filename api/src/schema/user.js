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
  return findUserById;
};

module.exports = {
  list,
  search,
};
