import { Document } from 'mongoose';

export interface IProductos extends Document {
    readonly codigo: string;
    readonly descripcion: string;
    readonly unidad_medida: string;
    readonly cantidad: number;
    readonly precio: number;
    readonly alerta_stock_minimo: boolean;
    readonly cantidad_minima: number;
    readonly calculo_por_costo: boolean;
    readonly porcentaje_ganancia: number;
    readonly precio_costo: number;
    readonly promocion: boolean;
    readonly precio_promocion: number;
    readonly activo: boolean;
}