const admin = require('firebase-admin')
const serviceAccount = require('../firibase_keys.json');
 
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const bd = admin.firestore();
const projetoscollection = bd.collection('projetos');

module.exports = { bd, projetoscollection};