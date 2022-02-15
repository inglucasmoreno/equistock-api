import { Schema, Types } from "mongoose";

export const productoSchema = new Schema({

    codigo: {
        type: String,
        required: true,
        trim: true
    },
    
    descripcion: {
        type: String,
        uppercase: true,
        required: true,
        trim: true
    },

    unidad_medida: {
        type: Schema.Types.ObjectId,
        ref: 'unidad-medida',
        required: true,
    },

    cantidad: {
        type: Number,
        required: true,
    },

    precio: {
        type: Number,
        required: true,
    },

    alerta_stock_minimo: {
        type: Boolean,
        default: false,
    },

    cantidad_minima: {
        type: Number,
        default: 0,
    },

    calculo_por_costo: {
        type: Boolean,
        default: false,
    },

    porcentaje_ganancia: {
        type: Number,
        default: 0,
    },

    precio_costo: {
        type: Number,
        default: 0,
    },

    promocion: {
        type: Boolean,
        default: false,
    },

    precio_promocion: {
        type: Number,
        default: 0,
    },

    activo: {
        type: Boolean,
        default: true
    }

}, { timestamps: true, collection: 'productos' });


