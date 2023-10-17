const mongoose = require('mongoose');

const cancionesSchema = new mongoose.Schema({
    titulo: { type: String, require: true, min: [2, 'Tu nombre debe contenedr al menos 2 caracteres'] },
    duracion: { type: String, require: true, min: [2, 'Tu apellido debe contener al menos 2 caracteres']  },
});

module.exports = mongoose.model('cancionesModel', cancionesSchema);