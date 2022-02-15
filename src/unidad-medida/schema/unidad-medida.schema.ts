import { Schema } from "mongoose";

export const unidadMedidaSchema = new Schema({
    
    descripcion: {
        type: String,
        uppercase: true,
        required: true,
        trim: true
    },

    activo: {
        type: Boolean,
        default: true
    }

}, { timestamps: true, collection: 'unidad-medida' });