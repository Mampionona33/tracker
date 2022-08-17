const { getDb, getNextSequence } = require('../db');

const get = async (_, { input: { sub } }, context) => {
  const db = getDb();
  let filter = {};
  if (sub) {
    filter = {
      ...filter,
      'user.sub': sub,
    };
  }
  const getUserTask = await db.collection('tasks').find(filter).toArray();
  return getUserTask;
};

const getUserTaskByFilter = async (_, { input: { user, taskState } }) => {
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
  // newTask.session = Object.assign([], {
  //   0: { sessionStart: new Date(), sessionStop: null },
  // });

  const createNewTask = await db.collection('tasks').insertOne(newTask);
  const createdTask = await db
    .collection('tasks')
    .findOne({ id: createNewTask.id });
  return createdTask;
};

const update = async (
  _,
  {
    filter: { id, sub },
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
      productivity,
      totalElapstedTime,
      submitedDate,
    },
  }
) => {
  // console.log(id);
  const db = getDb();
  const filter = { id: id };
  let update = [{ $set: {} }];

  taskState && (update[0].$set.taskState = taskState);

  if (boothNumber) {
    boothNumber !== 'empty'
      ? (update[0].$set.boothNumber = boothNumber)
      : (update[0].$set.boothNumber = '');
  }

  if (type) {
    type !== 'emtpy'
      ? (update[0].$set.type = type)
      : (update[0].$set.type = '');
  }

  if (url) {
    url !== 'empty' ? (update[0].$set.url = url) : (update[0].$set.url = '');
  }

  if (cat) {
    cat !== 'empty' ? (update[0].$set.cat = cat) : (update[0].$set.cat = '');
  }

  if (statCom) {
    statCom !== 'empty'
      ? (update[0].$set.statCom = statCom)
      : (update[0].$set.statCom = '');
  }

  if (ivpn) {
    ivpn !== 'empty'
      ? (update[0].$set.ivpn = ivpn)
      : (update[0].$set.ivpn = '');
  }

  if (processingState) {
    processingState !== 'empty'
      ? (update[0].$set.processingState = processingState)
      : (update[0].$set.processingState = '');
  }

  if (nbBefore) {
    nbBefore !== 'empty'
      ? (update[0].$set.nbBefore = nbBefore)
      : (update[0].$set.nbBefore = 0);
  }

  if (nbAfter) {
    nbAfter !== 'empty'
      ? (update[0].$set.nbAfter = nbAfter)
      : (update[0].$set.nbAfter = 0);
  }

  if (productivity) {
    update[0].$set.productivity = productivity;
  }

  if (comment) {
    comment !== 'empty'
      ? (update[0].$set.comment = comment)
      : (update[0].$set.comment = '');
  }

  if (session) {
    const indexSession = session.length - 1;
    const objSession = session[indexSession];
    const sessionLength = Object.keys(objSession).length;

    // console.log(objSession);

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

  if (totalElapstedTime) {
    update[0].$set.totalElapstedTime = totalElapstedTime;
  }

  if (submitedDate) {
    update[0].$set.submitedDate = submitedDate;
  }
  console.log(update);

  const options = { upsert: false, returnNewDocument: true };
  const updateTask = db
    .collection('tasks')
    .findOneAndUpdate(filter, ...update, (erro, doc) => {
      if (erro) {
        console.log(erro);
      }
      // console.log(doc);
    });
  return { acknowledged: true };
};

const getTaskByDate = async (_, { query: { date, sub } }) => {
  const db = getDb();
  let filter = {};
  if (date && sub) {
    const slicedDate = date.slice(0, 10);
    console.log(slicedDate);
    filter = {
      ...filter,
      $or: [
        {
          'user.sub': sub,
          // 'session.sessionStart': date,
          'session.sessionStart': { $regex: slicedDate, $options: 'g' },
        },
        {
          'user.sub': sub,
          // 'session.sessionStart': date,
          'session.sessionStop': { $regex: slicedDate, $options: 'g' },
        },
      ],
    };
  }
  console.log(filter);
  const userTaskByDate = await db.collection('tasks').find(filter).toArray();
  return userTaskByDate;
};

module.exports = { get, create, update, getUserTaskByFilter, getTaskByDate };
