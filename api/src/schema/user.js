const { getDb } = require('../db');

const validation = async (newUser) => {
  const prevUserList = await list();
  const error = [];

  prevUserList.forEach((element) => {
    if (element.sub === newUser.sub) {
      error.push(`this user alredy exist`);
    }
  });
};

const list = async () => {
  const db = getDb();
  const users = await db.collection('users').find({}).toArray();
  return users;
};

const search = async (_, { input: { sub } }) => {
  const db = getDb();
  // creat filter
  let filter = {};
  if (sub) {
    filter.sub = sub;
  }

  const findUserById = await db.collection('users').find(filter).toArray();
  // console.log(filter);
  return findUserById;
};

const create = async (_, { user }) => {
  const db = getDb();
  const newUser = Object.assign({}, user);
  await validation(newUser);
  console.log('new user ', newUser);
  const insertUser = await db.collection('users').insertOne(newUser);
  const insertedUser = await db
    .collection('users')
    .findOne({ sub: insertUser.sub });
  return insertedUser;
};

module.exports = {
  list,
  search,
  create,
};
