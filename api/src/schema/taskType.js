const { getDb } = require('../db');

const allTaskTypeList = async () => {
  const db = getDb();
  const taskTypeList = await db.collection('taskType').find({}).toArray();
  return taskTypeList;
};

module.exports = { allTaskTypeList };
