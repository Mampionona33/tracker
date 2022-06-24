const { getDb, getNextSequence } = require('../db');

const list = async () => {
  const db = getDb();
  const users = await db.collection('users').find({}).toArray();
  return users;
};

module.exports = {
  list,
};
