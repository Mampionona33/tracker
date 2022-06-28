// This file is used to initialize the mongodb database:
// To initialize mongodb, run : node init.mogo.js in the terminal

const { MongoClient } = require('mongodb');
require('dotenv').config();

const resetMongo = async () => {
  console.log('\n----initialisation Mongodb----\n');
  const url = process.env.DB_URL;

  const client = new MongoClient(url, { useNewUrlParser: true });
  try {
    await client.connect();
    console.log('Connected to Mongodb');

    // connect to db
    const db = client.db();

    // asign docment to variables
    const collectionTask = db.collection('tasks');
    const collectionCounter = db.collection('counter');
    const collectionTypeTask = db.collection('typeTask');
    const collectionSatetIvpn = db.collection('statIvpn');
    const collectionStatCom = db.collection('stateCom');
    const collectionTaskCase = db.collection('taskCase');
    const collectionUsers = db.collection('users');

    // initializers--------------------------
    const initialiCounter = [
      { _id: 'tasks', current: 0 },
      { _id: 'typeTask', current: 0 },
      { _id: 'statIvpn', current: 0 },
      { _id: 'stateCom', current: 0 },
      { _id: 'taskCase', current: 0 },
      { _id: 'users', current: 1 },
    ];

    const initialUser = [
      {
        aud: '498868729809-sqv8at247oi30ldgt0se55j5397u71br.apps.googleusercontent.com',
        azp: '498868729809-sqv8at247oi30ldgt0se55j5397u71br.apps.googleusercontent.com',
        email: 'ramamps33@gmail.com',
        email_verified: true,
        exp: 1656052082,
        family_name: 'RAMAHAZOMANANA',
        given_name: 'Mampionona',
        iat: 1656048482,
        iss: 'https://accounts.google.com',
        jti: '87f5f072c4cd6352c7f4427f49d1f48cb3dc7404',
        name: 'Mampionona RAMAHAZOMANANA',
        nbf: 1656048182,
        picture:
          'https://lh3.googleusercontent.com/a-/AOh14GhNIqDekuddjj1nn6MOLV2bx9TzVTbalcolSsL6wg=s96-c',
        sub: '100620047698438001642',
        role: 'admin',
      },
    ];

    const initTasks = [
      {
        id: 0,
        user: { sub: '100620047698438001642' },
        num: '14334',
        type: 'contenu',
        url: 'www.directindustry.com',
        cat: 'sécurité des locaux et dés machines',
        ivpn: 'I',
        statCom: 'Dégradé',
        status: 'Processing',
      },
    ];
    // initializers--------------------------

    // Remove  collection and insert initializers
    await collectionCounter.deleteMany({});
    await collectionCounter.insertMany(initialiCounter);
    const resultCounter = await collectionCounter.find({}).toArray();

    await collectionUsers.deleteMany({});
    await collectionUsers.insertMany(initialUser);
    const resultUser = await collectionUsers.find({}).toArray();

    // show result in terminal
    console.log(
      'Result of instert : \n',
      resultCounter,
      '-----------\n',
      resultUser,
      '-----------\n'
    );
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
};

resetMongo();
