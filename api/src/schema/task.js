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
  return getUserTaskPlay;
};

const create = async (_, { task }) => {
  const db = getDb();
  const newTask = { ...{}, ...task };
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

  let update = [{ $set: {} }];

  if (taskState) {
    // update.push({ $set: { taskState: taskState } });

    /* 
      This condition bellow is used to append a new element in 
      session when taskState set to  isPlay.
      $addToSet allow to append new element in the session Array once, 
      if it does'not alredy exist.
    */
    update.map((item) => {
      item.$set.taskState = taskState;
    });
  }

  if (boothNumber) {
    update.map((item) => {
      if (Object.keys('$set')) {
        item.$set.boothNumber = boothNumber !== 'empty' ? boothNumber : '';
      }
    });
  }

  if (type) {
    update.map((item) => {
      if (Object.keys('$set')) {
        item.$set.type = type !== 'empty' ? type : '';
      }
    });
  }

  if (url) {
    update.map((item) => {
      if (Object.keys('$set')) {
        item.$set.url = url !== 'empty' ? url : '';
      }
    });
  }

  if (cat) {
    update.map((item) => {
      if (Object.keys('$set')) {
        item.$set.cat = cat !== 'empty' ? cat : '';
      }
    });
  }

  if (statCom) {
    update.map((item) => {
      if (Object.keys('$set')) {
        item.$set.statCom = statCom !== 'empty' ? statCom : '';
      }
    });
  }

  if (ivpn) {
    update.map((item) => {
      if (Object.keys('$set')) {
        item.$set.ivpn = ivpn !== 'empty' ? ivpn : '';
      }
    });
  }

  if (processingState) {
    update.map((item) => {
      if (Object.keys('$set')) {
        item.$set.processingState =
          processingState !== 'empty' ? processingState : '';
      }
    });
  }

  if (nbBefore) {
    update.map((item) => {
      if (Object.keys('$set')) {
        item.$set.nbBefore = nbBefore !== 'empty' ? nbBefore : '';
      }
    });
  }

  if (nbAfter) {
    update.map((item) => {
      if (Object.keys('$set')) {
        item.$set.nbAfter = nbAfter !== 'empty' ? nbAfter : '';
      }
    });
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
    const sessionStart = [...session].map((item) => item.sessionStart);

    const sessionStop = [...session].map((item) => item.sessionStop);
    const session_id = [...session].map((item) => item.session_id);

    const sessionStopValue = sessionStop.reduce((a, b) => a + b);
    const sessionStartValue = sessionStart.reduce((a, b) => a + b);

    if (sessionStopValue !== undefined && sessionStartValue === undefined) {
      update.map(
        (item) =>
          (item.$set = {
            ...item.$set,
            'session.$.sessionStop': sessionStopValue,
          })
      );
    }

    /* 
      CREATE NEW SESSION
      This condition bellow is used to append a new element in 
      session when taskState set to  isPlay.
      $addToSet allow to append new element in the session Array once, 
      if it does'not alredy exist.
    */
    if (sessionStartValue !== undefined && sessionStopValue === undefined) {
      update.map(
        (item) =>
          (item.$addToSet = {
            session: {
              session_id: session_id.reduce((a, b) => Math.max(a, b)) + 1,
              sessionStart: sessionStartValue,
              sessionStop: null,
            },
          })
      );
    }

    /* 
      HANDLE HISTORY EDIT
      The $ operator can update the first array element that matches 
      multiple query criteria specified with the $elemMatch operator.
    */
    if (
      sessionStartValue !== undefined &&
      sessionStopValue !== undefined &&
      new Date(sessionStartValue).getTime() <
        new Date(sessionStopValue).getTime()
    ) {
      update.map((item) => {
        item.$set = {
          'session.$.sessionStart': sessionStart,
          'session.$.sessionStop': sessionStop,
        };
      });
    }
  }

  if (totalElapstedTime) {
    update[0].$set.totalElapstedTime = totalElapstedTime;
  }

  if (submitedDate) {
    update[0].$set.submitedDate = submitedDate;
  }

  console.log('update', update);

  const options = { upsert: false, returnNewDocument: true };

  const updateTask = db
    .collection('tasks')
    .findOneAndUpdate(filter, ...update, (erro, doc) => {
      if (erro) {
        console.log(erro);
        return erro;
      }
      console.log(doc);
    });

  console.log('filter', filter);
  const result = await db.collection('tasks').findOne(filter);
  return result;
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
