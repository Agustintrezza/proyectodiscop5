const express = require("express");
const router = express.Router();
const conciertosModel = require("../models/Conciertos");
const isAuth = require("../public/scripts/utils/utils");

// EDITAR CUPO DE TICKETS
router.put("/actualizar-cupo/:id", async (request, response) => {
  try {
    const concierto = await conciertosModel.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true }
    );
    concierto.ticketsdisponibles = request.body.cantidad;

    const updatedConcierto = await concierto.save();
    response.send({
      ticketsdisponibles: updatedConcierto.ticketsdisponibles,
    });
  } catch (error) {
    response
      .status(500)
      .send({message:"No se pudo actualizar el concierto, vuelva a intentarlo.", error});
    console.error(error);
  }
});

// DESCUENTA LA CANTIDAD SELECCIONADA AL CUPO DEL CONCIERTO
router.put("/descontarcantidad/:id", async (request, response) => {
  try {
    const concierto = await conciertosModel.findByIdAndUpdate( 
      request.params.id,
      request.body,
      { new: true }
    );

    if(concierto && concierto.ticketsdisponibles > 0) {
      concierto.ticketsdisponibles = concierto.ticketsdisponibles - request.body.cantidad;
      const updatedConcierto = await concierto.save();
      response.send({
        ticketsdisponibles: updatedConcierto.ticketsdisponibles,
      });
    } else {
      response.send({
        ticketsdisponibles: concierto.ticketsdisponibles
      });
    }

    
  } catch (error) {
    response
      .status(500)
      .send({message:"No se pudo actualizar el concierto, vuelva a intentarlo.", error: error});
    console.error(error);
  }
});

// DEVUELVE TODOS LOS ÁLBUMES
router.get("/vertodoslosconciertos", async (req, res) => {
  try {
    const conciertos = await conciertosModel.find();
    res.status(200).send({ message: "llegan los conciertos!", conciertos });
  } catch (error) {
    res
      .status(200)
      .send("No se pudieron obtener los conciertos, vuelva a intentarlo.");
    console.log(error);
  }
});

// DEVUELVE UN ALBUM POR ID
router.get("/buscarconciertoid/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let concierto = await conciertosModel.findById(id);
    res.status(200).send(concierto);
  } catch (error) {
    res.status(200).send("No se pudo encontrar el álbum, vuelva a intentarlo.");
    console.log(error);
  }
});

// AGREGA UN ÂLBUM
router.post("/crearconcierto", async (req, res) => {
  console.log(req.headers);
  try {
    await conciertosModel.create(req.body);
    res.status(200).send("Álbum creado exitosamente!");
  } catch (error) {
    res.status(500).send("No se pudo crear el álbum, vuelva a intentarlo.");
    console.log(error);
  }
});

module.exports = router;
