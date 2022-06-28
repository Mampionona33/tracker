const { getDb, getNextSequence } = require('../db');

const get = async (_, { input: { sub } }) => {
  const db = getDb();
  const filter = {};
  if (sub) {
    filter.sub = sub;
  }
  const getUserTask = await db.collection('tasks').find(filter).toArray();
  return getUserTask;
};

module.exports = { get };
