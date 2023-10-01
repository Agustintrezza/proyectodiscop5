const express = require('express');
const router = express.Router();
const albumModel = require('../models/Albums');
const isAuth = require('../public/scripts/utils/utils');


// DEVUELVE TODOS LOS ÁLBUMES
router.get('/vertodoslosalbumes', async (req, res) => {
    try {
        const albums = await albumModel.find();
        res.status(200).send({ message: "Te logueaste exitosamente!", albums});
    } catch (error) {
        res.status(200).send("No se pudieron obtener los álbumes, vuelva a intentarlo.");
        console.log(error);
    }
});

// DEVUELVE UN ALBUM POR ID
router.get('/buscaralbumid/:id', async (req, res) => {
    try {
        const id = req.params.id;
        let album = await albumModel.findById(id)
        res.status(200).send(album);
    } catch (error) {
        res.status(200).send("No se pudo encontrar el álbum, vuelva a intentarlo.");
        console.log(error);
    }
})

// AGREGA UN ÂLBUM
router.post('/crearalbum',  isAuth, async (req, res) => {
    console.log(req.headers)
    try {
        await albumModel.create(req.body);
        res.status(200).send("Álbum creado exitosamente!");
    } catch (error) {
        res.status(500).send("No se pudo crear el álbum, vuelva a intentarlo.");
        console.log(error)
    }
});

// ACTUALIZA UN ÀLBUM
router.put('/actualizaralbum/:id', async (request, response) => {
    try {
        const album = await albumModel.findByIdAndUpdate(request.params.id, request.body, {new: true});
        response.status(200).send("Álbum creado exitosamente", album)
    } catch (error) {
        res.status(200).send("No se pudo actualizar el álbum, vuelva a intentarlo.");
        console.error(error)
    }
});

// ELIMINA UN ÄLBUM
router.delete('/eliminaralbum/:id', isAuth, async (req, res) => {
    console.log(req.params.id)
    try {

        const match = await albumModel.findById(req.params.id)
        if(match) {
            // console.log('hubo match')
            const albumEliminado = await albumModel.findByIdAndDelete(req.params.id)
            // console.log(albumEliminado)
            res.status(204).send('El álbum se eliminó correctamente');

        } else {
            console.log('no hubo match')
            res.status(500).send({message: 'Ese id no corresponde a un álbum'});

        }
    } catch (error) {
        res.status(200).send("No se encontro el álbum que se quiere elminar.");
        console.log(error);
    }
})


module.exports = router;