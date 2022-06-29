const { getDb, getNextSequence } = require('../db');

const get = async (_, { input: { user } }) => {
  const db = getDb();
  const filter = {};
  if (user) {
    filter.sub = user.sub;
  }
  const getUserTask = await db.collection('tasks').find(filter).toArray();
  return getUserTask;
};

module.exports = { get };
