const admin = require('firebase-admin')
const express = require('express');
const cors = require('cors');
const app = express();

const serviceAccount = {
  type: "service_account",
  project_id: "bd-portifolio-612c5",
  private_key_id: "975fc2323207157ff7f8b7b6ec1337f0ee6187e7",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCfUMZ1vTBEbGEP\n1NvBn1Dg6713rxr+k7fRUMJm/vKMY0voHPSF+Ha8bFYazQx7RuaItfgOK1a14Abc\nxMnfJ2mFGfWsKjh6qEcLEbGt5+y/m1bWwBjGo6d/RaZY7dEoJF1NHPqAyBULvwVw\nIGR5VwytXB4g41nj7M2q4qzYiCj8B+CeeXW7EWz3PWivPgyL0FtQRaKTLjTQJmwO\nc4S1Z6e2taPebFeua1+S8MXYMP9iPT3zrwRy8JIPED/vLnUPYZgId6qcAP7yPjWD\nZjofLir4d/9yxOmgBK0yRX1QhYEBogC7cxA8wn8EOjWkrX4HVvzVXw+hXwjJAwZd\nydF+qDtFAgMBAAECggEAP6V/g64PSGab6D07hgDlyNWlHdlgyW+uMfs3jvovYBKT\nUqmuro7ysJf/Vjmw0NckZl18OfzqaUKUu0IK/BG8wCX81ckQQ0BTEYMCHt3W4T1n\n1edsfn8G/XuP11s7AfR1Kcd39Fb6wXSQ8ZifSzKRp/hzOORbFwmVqL1iHCdZaEYD\naTAvpOK7gNXMnSwCfQEICfPgbMUWrvzeizAI8sEbxOF9VZgi1gYxxy6U+Qrr0dgT\n3rboaw09Nn34X3gxQ8JkG2fDrgf6DhmobX2JRSRswHP8Q1i1oMr+mf2hUCGW4MjD\nYKMZBYpXzpc0TxR9m7t0kkQ1UHjPomaN8+Knd+LTCQKBgQDcMsgqws+Mq6A0OYK4\n1HewNPWI/lys1CRyCjCrScZyRMuFRxpKWk81UWfisM/ccvbsw//e+b4DwWtZC72b\nzyuy4QovHmd6Fwb/QGfUde2NJjJ1ThblkYc0KBh6u5sHusVQ/y+byTtJIzGHNY+8\nnJOPlTzwkWOE3O9D6kAtCNcUtwKBgQC5N+TpOKZPGcEsN7IjqJs0jVdj8bslRJUO\nuavNSdFeX+RFM9PlVg40VUg8T4cayskHQlAYkTcDDUGSTBOK5InABS/4UJskJ20K\n+W010mtnn+3ElNcSnFbMUQ/cGVYdz/z4i8zuzaVQCPnKeUb4vLWyJaDJMBxeDRC5\nm6PQW1sL4wKBgGRwEVdX1p2eZwuLM/Ikj5djAKAFDbaTaTBPL5Xhp8/VS1O2c+p4\nOOrj/9OpvJYcJj8mw54sIhzKa7GJJmpcW91Swndtkdthh4KEGRgS1lDsnFVfUhhS\nge4rX8cTrYogCgKA83FGn3EjyWKX7sEkVjZG5y3/0vn2YHiE79La1mgPAoGAI74U\nj6kd9u/KZmUNHHKCGP8ZmTDh44w7k47jB4eyPpsUqwIYZw5XSWQXv4O9V79AUgVK\n/aKwUgdx2vCRaOE3b/XQTwQHHE/7a/28RIGptmKXeLMcWfwPh/gwrlG5W6FyeOhJ\nkN/ggfRpd9g1iPSpv4ohYBHHt6Kf0qGlWCT5Ce8CgYEAovR8i3l7C1pBfpkesFFs\nMNupNMDfN6p6GWJjKZuHkU2hdhuAcFTRJq5YM50lu4FWioWWgVzaj29pb8ffPRnm\no52I7X9ay8Hr2qJDa3VsY5VBqQ5BE64tpaH1Zk6DG1U7q4Uen/lFbhvyIMKw3gSX\nKUoxHmvTeHtnmxoo7p+okSY=\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-fbsvc@bd-portifolio-612c5.iam.gserviceaccount.com",
  client_id: "114215698363209662847",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40bd-portifolio-612c5.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
}

app.use(cors());
app.use(express.json());

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const bd = admin.firestore();
const projetoscollection = bd.collection('projetos');


app.get('/', async (req, res) => {
    try {
        const snapshot = await projetoscollection.get();
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.send(data);
    } catch (erro) {
        res.status(500).send(erro.mensage);
    }
});

app.post('/', async (req, res) => {
    try {
        const docRef = await projetoscollection.add(req.body);
        res.status(201).send({ id: docRef.id });
    } catch (erro) {
        res.status(500).send(erro.mensage);
    }
})

app.put('/:id', async (req, res) => {
    try {
        await projetoscollection.doc(req.params.id).update(req.body);
        res.send({ mensage: 'Atualizado com sucesso' });
    } catch (erro) {
        res.status(500).send(erro.mensage);
    }
})


app.delete('/:id', async (req, res) => {
    try {
        await projetoscollection.doc(req.params.id).delete();
        res.send({ mensage: 'deletado com sucesso' });
    } catch (erro) {
        res.status(500).send(erro.mensage)
    }
});


//app.listen(3000, () => {
//   console.log('servidor rodando em http://localhost:3000')
// });

module.exports = app;