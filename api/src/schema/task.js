const { getDb, getNextSequence } = require('../db');

const get = async (_, { input: { sub } }) => {
  const db = getDb();
  let filter = {};
  console.log(sub);
  if (sub) {
    filter = {
      ...filter,
      'user.sub': sub,
    };
  }
  console.log(filter);
  const getUserTask = await db.collection('tasks').find(filter).toArray();
  console.log(getUserTask);
  return getUserTask;
};

module.exports = { get };
