const { getDb, getNextSequence } = require('../db');

async function list() {
  const db = getDb();
  const users = await db.collection('users').find({}).toArray();
  return users;
}

async function add(_, { user }) {
  const db = getDb();
  const newUser = Object.assign({}, user);
  newUser.id = await getNextSequence('users');

  const result = await db.collection('users').insertOne(newUser);
  const savedUser = await db
    .collection('users')
    .findOne({ _id: result.insertedId });
}

async function search(_, { input: { uid } }) {
  const db = getDb();
  let filter = {};

  if (uid) {
    filter.uid = uid;
  }
  const filtredUser = await db.collection('users').find(filter).toArray();
  return filtredUser;
}

module.exports = { list, add, search };
