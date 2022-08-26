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

  const createNewTask = await db.collection('tasks').insertOne(newTask);
  const createdTask = await db
    .collection('tasks')
    .findOne({ id: createNewTask.id });
  return createdTask;
};

const update = async (
  _,
  {
    filter: { id, sessionId },
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
  const db = getDb();
  let filter = {};

  console.log('id', id);
  if (id) {
    filter = {
      ...filter,
      id: id,
    };
    console.log('id', id);
  }

  if (sessionId !== null && sessionId !== undefined) {
    filter = {
      ...filter,
      session: {
        $elemMatch: {
          session_id: sessionId,
        },
      },
    };
  }

  let update = [];
  // let update = [{ $set: {} }];

  if (taskState) {
    update.push({ $set: { taskState: taskState } });

    /* 
      This condition bellow is used to append a new element in 
      session when taskState set to  isPlay.
      $addToSet allow to append new element in the session Array once, 
      if it does'not alredy exist.
    */
    if (taskState === 'isPlay' && session) {
      const newSessionStartId = Array.from(session).map(
        (item) => item.session_id
      );
      console.log('newSessionStartId', newSessionStartId);
      Array.from(update).map(
        (item) =>
          (item.$addToSet = {
            session: {
              session_id:
                newSessionStartId &&
                newSessionStartId.reduce((a, b) => Math.max(a, b)) + 1,
              sessionStart: new Date(),
              sessionStop: null,
            },
          })
      );
    }

    /*
      The condition bellow allow to update only sessionStop
      by using the $ 
     */
    if (taskState === 'isPause' && session) {
      update[0].$set = {
        ...update[0].$set,
        'session.$.sessionStop': new Date(),
      };
    }

    if (taskState === 'isOff' && session) {
      console.log(`taskState === 'isOff'`, session);
      update[0].$set = {
        ...update[0].$set,
        'session.$.sessionStop': new Date(),
      };
    }
  }

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

  if (session && !taskState) {
    const sessionStart = Object.values(...session).at(
      Object.keys(...session).indexOf('sessionStart')
    );

    const sessionStop = Object.values(...session).at(
      Object.keys(...session).indexOf('sessionStop')
    );

    /* 
      The $ operator can update the first array element that matches 
      multiple query criteria specified with the $elemMatch operator.
    */
    if (new Date(sessionStart).getTime() < new Date(sessionStop).getTime()) {
      update.push({
        $set: {
          'session.$.sessionStart': sessionStart,
          'session.$.sessionStop': sessionStop,
        },
      });
    }
  }

  if (totalElapstedTime) {
    update[0].$set.totalElapstedTime = totalElapstedTime;
  }

  if (submitedDate) {
    update[0].$set.submitedDate = submitedDate;
  }

  console.log('filter', filter);
  console.log('update', update);

  const options = { upsert: false, returnNewDocument: true };

  // const find = await db.collection('tasks').find(filter).toArray();
  // console.log('find', find);

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
