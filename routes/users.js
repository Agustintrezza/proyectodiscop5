const express = require("express");
const router = express.Router();
const userModel = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');

dotenv.config()

//OBETENER TODOS LOS USUARIOS
router.get('/vertodoslosusuarios', async (req, res) => {
    try {
        const usuarios = await userModel.find()
        res.status(200).send(usuarios);
    } catch (error) {
        console.log(error);
    }
})

//CREAR UN USUARIO
router.post('/crearusuario', async (req, res) => {
    try {
        const saltRounds = 10; 
        let hash = await bcrypt.hash(req.body.contraseña, saltRounds)

        const newUser = await userModel.create({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            contraseña: hash,
            favoritos: []
        })

        res.status(200).send("Usuario creado exitosamente!");
    } catch (error) {
        console.log(error)
    }
})

// const clave_hasheada = "$2b$10$gM3OhRqD7PUoBx92J7bE8OPZJDdJkmKS0zz3bq/1lknT6ByFMqnKC"
// const user_pass = "pipipiazzolla";

// const check = async (contraseña, db_hash_pass ) => {
//     const match = await bcrypt.compare(contraseña, db_hash_pass)
//     console.log('Check', + match )
// }

// check(user_pass, clave_hasheada)

router.post('/login', async (req, res) => {
    try {
        let user = await userModel.find({email: req.body.email})  
        if(user) {
            
            contraseña = req.body.contraseña;
            contraseñaHash = user[0].contraseña;
            const match = await bcrypt.compare(contraseña, contraseñaHash)
            if(match) {
                const payload = {email: req.body.email, contraseña: contraseña}
                const secret = process.env.JWT_SECRET
                const token = jwt.sign(payload, secret, { expiresIn: '1h'})
                console.log(token);

                // const decodificar = jwt.verify(token, secret);
                // console.log("VERIFY", decodificar)
                res.send(token)
                // res.status(200).send("Te logueaste exitosamente!");

            } else {
                res.status(500).send("La contraseña no es válida.");
            }
        }

    } catch (error) {
        res.status(500).send("El email o la contraseña no son válidos");
        console.log(error)
    }
})



//BUSCAR UN USUARIO POR ID
router.get('/buscarusuarioid/:id', async (req, res) => {
    try {
        const id = req.params.id;
        let usuario = await userModel.findById(id)
        // usuario.contraseña = "********";
        // // usuario.contraseña = null;

        // usuario.contraseña

        // console.log(usuario.contraseña)
        res.status(200).send(usuario);
    } catch (error) {
        console.log(error);
    }
})

//EDITAR DATOS DEL USUARIO
router.put('/actualizarusuarioid/:id', async (request, response) => {
    try {
        const usuario = await userModel.findByIdAndUpdate(request.params.id, request.body, {new: true});
        // usuario.contraseña = "********";
        response.status(200).send(usuario)
    } catch (error) {
        console.error(error)
    }
})



module.exports = router;