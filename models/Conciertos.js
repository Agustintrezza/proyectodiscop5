const mongoose = require('mongoose');

const conciertosSchema = new mongoose.Schema({
    conjunto: {type: String, require: true},
    estadio: { type: String, require: [true, 'El título del álbum es un campo requerido.'] },
    fecha: { type: Date, require: true },
    ticketsdisponibles: {type: Number, min:[0, 'La cantidad no puede ser inferior a 0']},
    precio: {type: Number},
    politicademenores: {type: String},
    imagen: {type: String}
});

module.exports = mongoose.model('conciertosModel', conciertosSchema);