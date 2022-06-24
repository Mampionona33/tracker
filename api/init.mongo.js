// This file is used to initialize the mongodb database:
// To initialize mongodb, run : node init.mogo.js in the terminal

const { MongoClient } = require('mongodb');
require('dotenv').config();

const resetMongo = async () => {
  const url = process.env.DB_URL;
  console.log('\n----initialisation Mongodb----\n');
  const client = new MongoClient(url, { useNewUrlParser: true });
  try {
    await client.connect();
    console.log('Connected to Mongodb');

    // connect to db
    const db = client.db();

    // asign docment to variables
    const collectionTask = db.collection('typeTache');
    const collectionCounter = db.collection('counter');
    const collectionTaskType = db.collection('taskType');
    const collectionSatetIvpn = db.collection('statIvpn');
    const collectionStatCom = db.collection('stateCom');
    const collectionTaskCase = db.collection('taskCase');
    const collectionUsers = db.collection('users');

    // initializers--------------------------
    const initialiCounter = [
      { _id: 'task', current: 0 },
      { _id: 'taskType', current: 49 },
      { _id: 'statIvpn', current: 5 },
      { _id: 'stateCom', current: 10 },
      { _id: 'taskCase', current: 4 },
      { _id: 'users', current: 1 },
    ];

    const initTaskType = [
      {
        id: 1,
        name: 'Contenu',
        objectif: 16,
      },
      {
        id: 2,
        name: 'Contenu (Zappé)',
        objectif: 80,
      },
      {
        id: 3,
        name: 'Contenu +20',
        objectif: 15.5,
      },
      {
        id: 4,
        name: 'ContenuFullCréa',
        objectif: 15,
      },
      {
        id: 5,
        name: 'ContenuFullCréaPrio',
        objectif: 15,
      },
      {
        id: 6,
        name: 'ContenuFullMAJ',
        objectif: 15.5,
      },
      {
        id: 7,
        name: 'ContenuFullMAJPrio',
        objectif: 15.5,
      },
      {
        id: 8,
        name: 'Créa',
        objectif: 6.5,
      },
      {
        id: 9,
        name: 'CréaLight',
        objectif: 8.5,
      },
      {
        id: 10,
        name: 'CréaLightPrio',
        objectif: 8.5,
      },
      {
        id: 11,
        name: 'CréaPrio',
        objectif: 6.5,
      },
      {
        id: 12,
        name: 'MAJ',
        objectif: 8,
      },
      {
        id: 13,
        name: 'MAJLight',
        objectif: 10,
      },
      {
        name: 'MAJLightPrio',
        objectif: 10,
        id: 14,
      },
      {
        name: 'MAJPrio',
        objectif: 8,
        id: 15,
      },
      {
        name: 'MAJFullPrio',
        objectif: 6.5,
        id: 16,
      },
      {
        name: 'MAJFull',
        objectif: 6.5,
        id: 17,
      },
      {
        name: 'MAJSPEC',
        objectif: 10,
        id: 18,
      },
      {
        name: 'PDF',
        objectif: 20,
        id: 19,
      },
      {
        name: 'MAJ BOOST',
        objectif: 80,
        id: 20,
      },
      {
        name: 'Jugement',
        objectif: 50,
        id: 21,
      },
      {
        name: 'REASSOPROD',
        objectif: 60,
        id: 22,
      },
      {
        name: 'AUTOVALIDCREA',
        objectif: 6.5,
        id: 23,
      },
      {
        name: 'AUTOVALIDMAJ',
        objectif: 8,
        id: 24,
      },
      {
        name: 'RFQ',
        objectif: 10,
        id: 25,
      },
      {
        name: 'MAJ Prix',
        objectif: 15,
        id: 26,
      },
      {
        name: 'Projet Prix',
        objectif: 12,
        id: 27,
      },
      {
        name: 'VALIDCLIENT',
        objectif: 2,
        id: 28,
      },
      {
        name: 'VALIDOUT',
        objectif: 5,
        id: 29,
      },
      {
        name: 'Matching Grille Tarifaire',
        objectif: 10,
        id: 30,
      },
      {
        name: 'Matching PDF',
        objectif: 5,
        id: 31,
      },
      {
        name: 'CREADemo',
        objectif: 60,
        id: 32,
      },
      {
        id: 33,
        name: 'MAJT',
        objectif: 5,
      },
      {
        id: 34,
        name: 'MAJNew',
        objectif: 3,
      },
      {
        id: 35,
        name: 'AUTOVALIDCREADemo',
        objectif: 60,
      },
      {
        id: 36,
        name: 'AUTOVALIDCREADemoLIGHT',
        objectif: 65,
      },
      {
        id: 37,
        name: 'AUTOVALIDCREADemoFULL',
        objectif: 65,
      },
      {
        id: 38,
        name: 'AUTOVALIDMAJT',
        objectif: 5,
      },
      {
        id: 39,
        name: 'AUTOVALIDMAJTLIGHT',
        objectif: 10,
      },
      {
        id: 40,
        name: 'AUTOVALIDMAJTFULL',
        objectif: 15,
      },
      {
        id: 41,
        name: 'AUTOVALIDMAJNew',
        objectif: 3,
      },
      {
        id: 42,
        name: 'AUTOVALIDCREAPrio',
        objectif: 6.5,
      },
      {
        id: 43,
        name: 'AUTOVALIDCREALIGHTPrio',
        objectif: 8.5,
      },
      {
        id: 44,
        name: 'AUTOVALIDCREAFULLPrio',
        objectif: 15,
      },
      {
        id: 45,
        name: 'AUTOVALIDMAJPrio',
        objectif: 8,
      },
      {
        id: 46,
        name: 'AUTOVALIDMAJLIGHTPrio',
        objectif: 10,
      },
      {
        id: 47,
        name: 'AUTOVALIDMAJFULLPrio',
        objectif: 15,
      },
      {
        id: 48,
        name: 'Empty Type',
        objectif: 0,
      },
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

    const initStatuIvpn = [
      { id: 1, name: 'I' },
      { id: 2, name: 'V' },
      { id: 3, name: 'P' },
      { id: 4, name: 'N' },
    ];

    const initialTaskCase = [
      { id: 1, state: 'Normal' },
      { id: 2, state: 'Sby' },
      { id: 3, state: 'Paf' },
    ];

    const initialStatCom = [
      {
        id: 1,
        name: '---',
      },
      {
        id: 2,
        name: 'Abondon',
      },
      {
        id: 3,
        name: 'Abonné',
      },
      {
        id: 4,
        name: 'Dégradé',
      },
      {
        id: 5,
        name: 'Dégradé Definitif',
      },
      {
        id: 6,
        name: 'Essai',
      },
      {
        id: 7,
        name: 'EssaiNouveau',
      },
      {
        id: 8,
        name: 'Essai Payant',
      },
      {
        id: 9,
        name: 'Retiré',
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

    await collectionTaskType.deleteMany({});
    await collectionTaskType.insertMany(initTaskType);
    const resultTaskType = await collectionTaskType.find({}).toArray();

    await collectionSatetIvpn.deleteMany({});
    await collectionSatetIvpn.insertMany(initStatuIvpn);
    const resultStatuIvpn = await collectionSatetIvpn.find({}).toArray();

    await collectionTaskCase.deleteMany({});
    await collectionTaskCase.insertMany(initialTaskCase);
    const resultTaskCase = await collectionTaskCase.find({}).toArray();

    await collectionStatCom.deleteMany({});
    await collectionStatCom.insertMany(initialStatCom);
    const resultStatuCom = await collectionStatCom.find({}).toArray();

    // show result in terminal
    console.log(
      'Result of instert : \n',
      resultCounter,
      '-----------\n',
      resultUser,
      '-----------\n',
      resultTaskType,
      '-----------\n',
      resultStatuIvpn,
      '-----------\n',
      resultTaskCase,
      '-----------\n',
      resultStatuCom,
      '-----------\n'
    );
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
};

resetMongo();
