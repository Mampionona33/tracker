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
  return getUserTask;
};

const getUserPlay = async (_, { input: { user, taskState } }) => {
  const db = getDb();
  let filter = {};
  if (user) {
    filter = {
      ...filter,
      'user.sub': user.sub,
    };
  }
  if (taskState) {
    filter = {
      ...filter,
      taskState: taskState,
    };
  }
  const getUserTaskPlay = await db.collection('tasks').find(filter).toArray();
  console.log(getUserTaskPlay);
  return getUserTaskPlay;
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

const update = async (
  _,
  {
    filter: { id },
    update: {
      user,
      boothNumber,
      type,
      url,
      cat,
      ivpn,
      statCom,
      processingState,
      nbBefore,
      nbAfter,
      taskState,
      comment,
    },
  }
) => {
  console.log(id);
  const db = getDb();
  const filter = { id: id };
  let update = [{ $set: {} }];
  if (taskState) {
    update[0].$set.taskState = taskState;
  }
  const options = { upsert: false, returnNewDocument: true };
  const updateTask = db
    .collection('tasks')
    .findOneAndUpdate(filter, ...update, options, (erro, doc) => {
      if (erro) {
        console.log(erro);
      }
      console.log(doc);
    });
  return updateTask;
};

module.exports = { get, create, update, getUserPlay };
