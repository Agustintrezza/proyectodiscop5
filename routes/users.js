const express = require("express");
const router = express.Router();
const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const isAuth = require("../public/scripts/utils/utils");

dotenv.config();

//OBETENER TODOS LOS USUARIOS

router.get("/vertodoslosusuarios", isAuth, async (req, res) => {
  try {
    const usuarios = await userModel.find();
    res.status(200).send(usuarios);
  } catch (error) {
    console.log(error);
  }
});

//CREAR UN USUARIO
router.post("/crearusuario", async (req, res) => {
  try {
    const saltRounds = 10;
    let hash = await bcrypt.hash(req.body.contraseña, saltRounds);

    const payload = { email: req.body.email, contraseña: req.body.contraseña };
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(payload, secret, { expiresIn: "60d" });

    const newUser = await userModel.create({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      contraseña: hash,
      favoritos: [],
      token: token,
    });

    res.status(200).send("Usuario creado exitosamente!");
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    let user = await userModel.find({ email: req.body.email });
    if (user) {
      contraseña = req.body.contraseña;
      contraseñaHash = user[0].contraseña;
      const match = await bcrypt.compare(contraseña, contraseñaHash);
      if (match) {
        const payload = { email: req.body.email, contraseña: contraseña };
        const secret = process.env.JWT_SECRET;
        const token = jwt.sign(payload, secret, { expiresIn: "3h" });
        user.token = token;
        res
          .status(200)
          .send({ message: "Te logueaste exitosamente!", token: token, user });
      } else {
        res.status(500).send("La contraseña no es válida.");
      }
    }
  } catch (error) {
    res.status(500).send("El email o la contraseña no son válidos");
    console.log(error);
  }
});

//BUSCAR UN USUARIO POR ID
router.get("/buscarusuarioid/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let usuario = await userModel.findById(id);
    res.status(200).send(usuario);
  } catch (error) {
    console.log(error);
  }
});

//EDITAR DATOS DEL USUARIO
router.put("/actualizarusuarioid/:id", async (request, response) => {
  try {
    const usuario = await userModel.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true }
    );
    response.status(200).send(usuario);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
