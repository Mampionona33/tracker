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

const create = async (_, { task }) => {
  const db = getDb();
  const newTask = Object.assign({}, task);
  newTask.id = await getNextSequence('tasks');

  const createNewTask = await db.collection('tasks').insertOne(newTask);
  const createdTask = await db
    .collection('tasks')
    .findOne({ id: createNewTask.id });
  return createdTask;
};

module.exports = { get, create };
