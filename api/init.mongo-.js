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
    const collectionTypeTask = db.collection('taskType');
    const collectionSatetIvpn = db.collection('statIvpn');
    const collectionStatCom = db.collection('stateCom');
    const collectionTaskCase = db.collection('taskCase');
    const collectionUsers = db.collection('users');

    // initializers--------------------------
    const initialiCounter = [
      { _id: 'tasks', current: 2 },
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
        boothNumber: '14334',
        type: 'contenu',
        url: 'https://www.directindustry.com',
        cat: 'sécurité des locaux et dés machines',
        ivpn: 'I',
        statCom: 'Dégradé',
        processingState: 'Normal',
        status: 'Processing',
        nbBefore: 0,
        nbAfter: 100,
        comment: 'this is a comment',
        taskState: 'isOff',
        totalElapstedTime: null,
        submitedDate: null,
        productivity: 0,
        session: [
          {
            session_id: 0,
            sessionStart: '2022-07-07T09:20:09.267Z',
            sessionStop: '2022-07-07T10:44:09.267Z',
          },
          {
            session_id: 1,
            sessionStart: '2022-07-07T10:44:09.267Z',
            sessionStop: '2022-07-07T12:44:09.267Z',
          },
        ],
      },
      {
        id: 1,
        user: { sub: '100620047698438001642' },
        boothNumber: '5455',
        type: 'Créa',
        url: 'https://www.directindustry.com',
        cat: 'sécurité des locaux et dés machines',
        ivpn: 'I',
        statCom: 'Dégradé',
        processingState: 'Normal',
        status: 'Processing',
        nbBefore: 0,
        nbAfter: 1,
        comment: 'this is a comment',
        taskState: 'isPause',
        totalElapstedTime: null,
        submitedDate: null,
        productivity: 0,
        session: [
          {
            sessionStart: '2022-09-22T11:08:19.018Z',
            sessionStop: '2022-09-22T11:12:39.189Z',
            session_id: 0,
          },
          {
            sessionStart: '2022-09-22T11:13:55.149Z',
            sessionStop: '2022-09-22T11:18:48.330Z',
            session_id: 1,
          },
        ],
      },
    ];

    const initTaskType = [
      {
        id: 1,
        name: 'Contenu',
        goal: 16,
      },
      {
        id: 2,
        name: 'Contenu (Zappé)',
        goal: 80,
      },
      {
        id: 3,
        name: 'Contenu +20',
        goal: 15.5,
      },
      {
        id: 4,
        name: 'ContenuFullCréa',
        goal: 15,
      },
      {
        id: 5,
        name: 'ContenuFullCréaPrio',
        goal: 15,
      },
      {
        id: 6,
        name: 'ContenuFullMAJ',
        goal: 15.5,
      },
      {
        id: 7,
        name: 'ContenuFullMAJPrio',
        goal: 15.5,
      },
      {
        id: 8,
        name: 'Créa',
        goal: 6.5,
      },
      {
        id: 9,
        name: 'CréaLight',
        goal: 8.5,
      },
      {
        id: 10,
        name: 'CréaLightPrio',
        goal: 8.5,
      },
      {
        id: 11,
        name: 'CréaPrio',
        goal: 6.5,
      },
      {
        id: 12,
        name: 'MAJ',
        goal: 8,
      },
      {
        id: 13,
        name: 'MAJLight',
        goal: 10,
      },
      {
        name: 'MAJLightPrio',
        goal: 10,
        id: 14,
      },
      {
        name: 'MAJPrio',
        goal: 8,
        id: 15,
      },
      {
        name: 'MAJFullPrio',
        goal: 6.5,
        id: 16,
      },
      {
        name: 'MAJFull',
        goal: 6.5,
        id: 17,
      },
      {
        name: 'MAJSPEC',
        goal: 10,
        id: 18,
      },
      {
        name: 'PDF',
        goal: 20,
        id: 19,
      },
      {
        name: 'MAJ BOOST',
        goal: 80,
        id: 20,
      },
      {
        name: 'Jugement',
        goal: 50,
        id: 21,
      },
      {
        name: 'REASSOPROD',
        goal: 60,
        id: 22,
      },
      {
        name: 'AUTOVALIDCREA',
        goal: 6.5,
        id: 23,
      },
      {
        name: 'AUTOVALIDMAJ',
        goal: 8,
        id: 24,
      },
      {
        name: 'RFQ',
        goal: 10,
        id: 25,
      },
      {
        name: 'MAJ Prix',
        goal: 15,
        id: 26,
      },
      {
        name: 'Projet Prix',
        goal: 12,
        id: 27,
      },
      {
        name: 'VALIDCLIENT',
        goal: 2,
        id: 28,
      },
      {
        name: 'VALIDOUT',
        goal: 5,
        id: 29,
      },
      {
        name: 'Matching Grille Tarifaire',
        goal: 10,
        id: 30,
      },
      {
        name: 'Matching PDF',
        goal: 5,
        id: 31,
      },
      {
        name: 'CREADemo',
        goal: 6.5,
        id: 32,
      },
      {
        id: 33,
        name: 'MAJT',
        goal: 5,
      },
      {
        id: 34,
        name: 'MAJNew',
        goal: 3,
      },
      {
        id: 35,
        name: 'AUTOVALIDCREADemo',
        goal: 6.5,
      },
      {
        id: 36,
        name: 'AUTOVALIDCREADemoLIGHT',
        goal: 65,
      },
      {
        id: 37,
        name: 'AUTOVALIDCREADemoFULL',
        goal: 65,
      },
      {
        id: 38,
        name: 'AUTOVALIDMAJT',
        goal: 5,
      },
      {
        id: 39,
        name: 'AUTOVALIDMAJTLIGHT',
        goal: 10,
      },
      {
        id: 40,
        name: 'AUTOVALIDMAJTFULL',
        goal: 15,
      },
      {
        id: 41,
        name: 'AUTOVALIDMAJNew',
        goal: 3,
      },
      {
        id: 42,
        name: 'AUTOVALIDCREAPrio',
        goal: 6.5,
      },
      {
        id: 43,
        name: 'AUTOVALIDCREALIGHTPrio',
        goal: 8.5,
      },
      {
        id: 44,
        name: 'AUTOVALIDCREAFULLPrio',
        goal: 15,
      },
      {
        id: 45,
        name: 'AUTOVALIDMAJPrio',
        goal: 8,
      },
      {
        id: 46,
        name: 'AUTOVALIDMAJLIGHTPrio',
        goal: 10,
      },
      {
        id: 47,
        name: 'AUTOVALIDMAJFULLPrio',
        goal: 15,
      },
      {
        id: 48,
        name: 'Empty Type',
        goal: 0,
      },
    ];
    // initializers--------------------------
    db.collection('typeTask').deleteMany({});
    // Remove  collection and insert initializers
    // await collectionCounter.deleteMany({});
    // await collectionCounter.insertMany(initialiCounter);
    const resultCounter = await collectionCounter.find({}).toArray();

    // await collectionUsers.deleteMany({});
    // await collectionUsers.insertMany(initialUser);
    const resultUser = await collectionUsers.find({}).toArray();

    // await collectionTask.deleteMany({});
    // await collectionTask.insertMany(initTasks);
    // const resultTask = await collectionTask.find({}).toArray();

    await collectionTypeTask.deleteMany({});
    await collectionTypeTask.insertMany(initTaskType);
    const resultInitTaskType = await collectionTypeTask.find({}).toArray();

    // show result in terminal
    console.log(
      'Result of instert : \n',
      // resultCounter,
      '\n',
      '-----------\n',
      // resultUser,
      '\n',
      '-----------\n',
      // resultTask,
      '-----------\n',
      resultInitTaskType
    );
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
};

resetMongo();
