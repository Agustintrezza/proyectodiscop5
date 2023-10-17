const express = require("express");
const router = express.Router();
const cancionesModel = require("../models/Canciones");
const isAuth = require("../public/scripts/utils/utils");

//OBETENER TODOS LAS CANCIONES
router.get("/vertodaslascanciones", async (req, res) => {
  try {
    const canciones = await cancionesModel.find();
    res.status(200).send(canciones);
  } catch (error) {
    console.log(error);
  }
});

// AGREGA UNA CANCION
router.post("/crearcancion", isAuth, async (req, res) => {
  console.log(req.headers);
  try {
    await cancionesModel.create(req.body);
    res.status(200).send("Canción creada exitosamente!");
  } catch (error) {
    res
      .status(500)
      .send({
        message: "No se pudo crear la canción, vuelva a intentarlo.",
        error,
      });
    console.log(error);
  }
});

// ELIMINA UNA CANCION
router.delete("/eliminarcancion/:id", isAuth, async (req, res) => {
  console.log(req.params.id);
  try {
    const match = await cancionesModel.findById(req.params.id);
    if (match) {
      console.log("hubo match");
      const cancionEliminada = await cancionesModel.findByIdAndDelete(
        req.params.id
      );
      res.status(204).send("La canción se eliminó correctamente");
    } else {
      console.log("no hubo match");
      res.status(500).send({ message: "Ese id no corresponde a una canción" });
    }
  } catch (error) {
    res.status(200).send("No se encontro la canción que se quiere elminar.");
    console.log(error);
  }
});

module.exports = router;
