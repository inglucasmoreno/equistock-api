import { ApiProperty } from "@nestjs/swagger";

export class ProductosUpdateDTO {

    // --- Datos de basicos de producto ---

    @ApiProperty({
        type: String,
        description: 'Codigo del producto'
    })
    readonly codigo: string;

    @ApiProperty({
        type: String,
        description: 'Descripcion del producto'
    })
    readonly descripcion: string;

    @ApiProperty({
        type: String,
        description: 'Unidad de medida'
    })
    readonly unidad_medida: string;

    @ApiProperty({
        type: Number,
        description: 'Cantidad actual (Stock)'
    })
    readonly cantidad: number
    
    @ApiProperty({
        type: Number,
        description: 'Precio del producto'
    })
    readonly precio: number;

    // --- Alerta por stock minimo ---

    @ApiProperty({
        type: Boolean,
        default: false,
        description: 'Alerta de stock minimo habilitada'
    })
    readonly alerta_stock_minimo: boolean;

    @ApiProperty({
        type: Number,
        default: 0,
        description: 'Cantidad minima (Stock minimo)'
    })
    readonly cantidad_minima: number;

    // --- Calculo de precio por costo ---

    @ApiProperty({
        type: Boolean,
        default: false,
        description: 'Habilitar calculo de precio por costo'
    })
    readonly calculo_por_costo: boolean;

    @ApiProperty({
        type: Number,
        default: 0,
        description: 'Porcentaje de ganancia'
    })
    readonly porcentaje_ganancia: number;

    @ApiProperty({
        type: Number,
        default: 0,
        description: 'Precio de costo'
    })
    readonly precio_costo: number;

    // --- Precio en promocion ---

    @ApiProperty({
        type: Boolean,
        default: false,
        description: 'Promocion habilitada'
    })
    readonly promocion: boolean;

    @ApiProperty({
        type: Number,
        default: 0,
        description: 'Precio promocion'
    })
    readonly precio_promocion: number;

    // Habilitacion de producto

    @ApiProperty({
        type: Boolean,
        default: true,
        description: 'Habilitado en sistema'
    })
    readonly activo: boolean;

}