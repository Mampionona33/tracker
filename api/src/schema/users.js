const { getDb, getNextSequence } = require('../db');

async function list(_, _, context) {
  console.log(context);
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

async function search(_, { input: { sub } }, context) {
  console.log(context);
  const db = getDb();
  let filter = {};

  if (sub) {
    filter.sub = sub;
  }
  const filtredUser = await db.collection('users').find(filter).toArray();
  return filtredUser;
}

module.exports = { list, add, search };
