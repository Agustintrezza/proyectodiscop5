const express = require('express');
const app = express();
// const PORT = 3000;
const dotenv = require('dotenv')

const router = express.Router();
const mongoose = require('mongoose');
const path = require('path');

const usersRouter = require('./routes/users.js');
const albumsRouter = require('./routes/albums.js');

dotenv.config()

// const password = 'SWDc8kzkMpa5JyO3';
// const url = `mongodb+srv://agus:${password}@db-plataforma5.tly21og.mongodb.net/`;

app.use(express.json());
app.use(router);
app.use(express.static(path.join(__dirname, 'public')))
app.use("/health", (req, res) => res.sendStatus(200));

app.use('/users', usersRouter);
app.use('/albums', albumsRouter);

async function connectToMongo() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        app.listen(process.env.PORT, () => {
            console.log('Conectado a la base de datos. Servidor corriendo en el puerto http://localhost:' + process.env.PORT)
        })
    } catch {
        console.log('error')
    }
}

connectToMongo();