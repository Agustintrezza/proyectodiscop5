const express = require('express');
const router = express.Router();
const conciertosModel = require('../models/Conciertos');
const isAuth = require('../public/scripts/utils/utils');

// EDITAR CUPO DE TICKETS
router.put('/actualizar-cupo/:id', async (request, response) => {
    try {
        console.log()
        const concierto = await conciertosModel.findByIdAndUpdate(request.params.id, request.body, {new: true});
        console.log(request.body.cantidad)
        concierto.ticketsdisponibles = request.body.cantidad;
        // console.log(concierto.ticketsdisponibles - req.body.cantidad)
        // response.status(200).send({message:"Concierto editado exitosamente"}, concierto)

        const updatedConcierto = await concierto.save();
      response.send({
        ticketsdisponibles: updatedConcierto.ticketsdisponibles,
      });
        console.log(ticketsdisponibles)
    } catch (error) {
        response.status(200).send("No se pudo actualizar el concierto, vuelva a intentarlo.");
        console.error(error)
    }
});

// DESCUENTA LA CANTIDAD SELECCIONADA AL CUPO DEL CONCIERTO 

router.put('/descontarcantidad/:id', async (request, response) => {
    try {
        console.log()
        const concierto = await conciertosModel.findByIdAndUpdate(request.params.id, request.body, {new: true});

        concierto.ticketsdisponibles = (concierto.ticketsdisponibles - request.body.cantidad);
        // console.log(concierto.ticketsdisponibles - req.body.cantidad)
        // response.status(200).send({message:"Concierto editado exitosamente"}, concierto)

        const updatedConcierto = await concierto.save();
      response.send({
        ticketsdisponibles: updatedConcierto.ticketsdisponibles,
      });
        console.log(ticketsdisponibles)
    } catch (error) {
        response.status(200).send("No se pudo actualizar el concierto, vuelva a intentarlo.");
        console.error(error)
    }
});

// DEVUELVE TODOS LOS ÁLBUMES
router.get('/vertodoslosconciertos', async (req, res) => {
    try {
        const conciertos = await conciertosModel.find();
        res.status(200).send({ message: "llegan los conciertos!", conciertos});
    } catch (error) {
        res.status(200).send("No se pudieron obtener los conciertos, vuelva a intentarlo.");
        console.log(error);
    }
});

// DEVUELVE UN ALBUM POR ID
router.get('/buscarconciertoid/:id', async (req, res) => {
    try {
        const id = req.params.id;
        let concierto = await conciertosModel.findById(id)
        res.status(200).send(concierto);
    } catch (error) {
        res.status(200).send("No se pudo encontrar el álbum, vuelva a intentarlo.");
        console.log(error);
    }
})

// AGREGA UN ÂLBUM
router.post('/crearconcierto', async (req, res) => {
    console.log(req.headers)
    try {
        await conciertosModel.create(req.body);
        res.status(200).send("Álbum creado exitosamente!");
    } catch (error) {
        res.status(500).send("No se pudo crear el álbum, vuelva a intentarlo.");
        console.log(error)
    }
});


// // ACTUALIZA UN ÀLBUM
// router.put('/actualizaralbum/:id', async (request, response) => {
//     try {
//         const album = await albumModel.findByIdAndUpdate(request.params.id, request.body, {new: true});
//         response.status(200).send("Álbum creado exitosamente", album)
//     } catch (error) {
//         res.status(200).send("No se pudo actualizar el álbum, vuelva a intentarlo.");
//         console.error(error)
//     }
// });

// // ELIMINA UN ÄLBUM
// router.delete('/eliminaralbum/:id', isAuth, async (req, res) => {
//     console.log(req.params.id)
//     try {

//         const match = await albumModel.findById(req.params.id)
//         if(match) {
//             // console.log('hubo match')
//             const albumEliminado = await albumModel.findByIdAndDelete(req.params.id)
//             // console.log(albumEliminado)
//             res.status(204).send('El álbum se eliminó correctamente');

//         } else {
//             console.log('no hubo match')
//             res.status(500).send({message: 'Ese id no corresponde a un álbum'});

//         }
//     } catch (error) {
//         res.status(200).send("No se encontro el álbum que se quiere elminar.");
//         console.log(error);
//     }
// })


module.exports = router;