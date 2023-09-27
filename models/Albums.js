const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    titulo: { type: String, require: [true, 'El título del álbum es un campo requerido.'] },
    descripcion: { type: String, require: [true, 'La descripción del álbum es un campo requerido y debe contener entre 5 y 200 caracteres.'], minLength: 5, maxLength: 200 },
    lanzamiento: { type: Date, require: [true, 'La fecha de lanazamiento del álbum es requerida y no debe ser menor o igual a =.'], min: [1]  },
    canciones: [{ 
        cancion: {type: String},
        duracion: {type: String}
     }],
    portada: { type: String }
});

module.exports = mongoose.model('albumModel', albumSchema);