const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombre: { type: String, require: true, min: [2, 'Tu nombre debe contenedr al menos 2 caracteres'] },
    apellido: { type: String, require: true, min: [2, 'Tu apellido debe contenedr al menos 2 caracteres']  },
    email: { 
        type: String, unique: true, validate: {
            validator: email => {
                const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                return regex.test(email);
            }, message: 'Formato de correo inválido'
        }
    },
    contraseña: { type: String },
    favoritos: { type: Array }
});

module.exports = mongoose.model('userModel', userSchema);