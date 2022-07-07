const { getDb, getNextSequence } = require('../db');

const get = async (_, { input: { sub } }) => {
  const db = getDb();
  let filter = {};
  // console.log(sub);
  if (sub) {
    filter = {
      ...filter,
      'user.sub': sub,
    };
  }
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
  // console.log(getUserTaskPlay);
  return getUserTaskPlay;
};

const create = async (_, { task }) => {
  const db = getDb();
  const newTask = Object.assign({}, task);
  newTask.id = await getNextSequence('tasks');
  newTask.session = Object.assign([], {
    0: { sessionStart: new Date(), sessionStop: null },
  });

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
      session,
    },
  }
) => {
  // console.log(id);
  const db = getDb();
  const filter = { id: id };
  let update = [{ $set: {} }];
  // let update = [];

  if (taskState) {
    // update = [Object.assign({}, { $set: { taskState: taskState } })];
    update[0].$set.taskState = taskState;
  }
  if (session) {
    const indexSession = session.length - 1;
    const objSession = session[indexSession];
    const sessionLength = Object.keys(objSession).length;

    console.log(objSession);

    const getCurrentTask = await db
      .collection('tasks')
      .find({ id: id })
      .toArray();

    // make copy of the current task session
    let prevSession = getCurrentTask[0].session;

    // if the new entry is two variable: it means that we must creat new object
    // inside our session array. in other words creat new session
    if (sessionLength === 2) {
      prevSession.push(...session);
      update[0].$set.session = prevSession;
    }

    // if variable is formed by only one object element
    // and the key of object is 'sessionStop';
    // we do the update for the last session.sessionStop
    if (sessionLength === 1 && Object.keys(session[0])[0] === 'sessionStop') {
      // console.log(prevSession[prevSession.length - 1].sessionStop);
      // console.log(session[0]);

      // set the value of copyed sessionStop equel to the value of session[0].sessionStop
      prevSession[prevSession.length - 1].sessionStop = session[0].sessionStop;
      update[0].$set.session = prevSession;
    }
  }

  const options = { upsert: false, returnNewDocument: true };
  const updateTask = db
    .collection('tasks')
    .findOneAndUpdate(filter, ...update, options, (erro, doc) => {
      if (erro) {
        console.log(erro);
      }
      // console.log(doc);
    });
  return { acknowledged: true };
};

module.exports = { get, create, update, getUserPlay };
