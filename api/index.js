const express = require('express');
const cors = require('cors');
const { projetoscollection } = require('./firebase');
const app = express();

app.use(cors());
app.use(express.json());


app.get('/projetos', async (req, res) => {
    try {
        const snapshot = await projetoscollection.get();
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.send(data);
    } catch (erro) {
        res.status(500).send(erro.mensage);
    }
});

app.post('/projetos', async (req, res) => {
    try {
        const docRef = await projetoscollection.add(req.body);
        res.status(201).send({ id: docRef.id });
    } catch (erro) {
        res.status(500).send(erro.mensage);
    }
})

app.put('/projetos/:id', async (req, res) => {
    try {
        await projetoscollection.doc(req.params.id).update(req.body);
        res.send({ mensage: 'Atualizado com sucesso' });
    } catch (erro) {
        res.status(500).send(erro.mensage);
    }
})


app.delete('/projetos/:id', async (req, res) => {
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