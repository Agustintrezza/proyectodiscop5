const express = require('express');
const app = express();
const PORT = 3000;

const router = express.Router();
const mongoose = require('mongoose');
const path = require('path');

const usersRouter = require('./routes/users.js');
const albumsRouter = require('./routes/albums.js');

const password = 'SWDc8kzkMpa5JyO3';
const url = `mongodb+srv://agus:${password}@db-plataforma5.tly21og.mongodb.net/`;

app.use(express.json());
app.use(router);
app.use(express.static(path.join(__dirname, 'public')))

app.use('/users', usersRouter);
app.use('/albums', albumsRouter);

async function connectToMongo() {
    try {
        await mongoose.connect(url);

        app.listen(PORT, () => {
            console.log('Conectado a la base de datos. Servidor corriendo en el puerto http://localhost:' + PORT)
        })
    } catch {
        console.log('error')
    }
}

connectToMongo();