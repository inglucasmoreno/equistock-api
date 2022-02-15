import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class ProductosDTO {

    // --- Datos de basicos de producto ---
 
    @ApiProperty({
        type: String,
        required: true,
        description: 'Codigo de producto'
    })
    @IsNotEmpty()
    readonly codigo: string;
    
    @ApiProperty({
        type: String,
        required: true,
        description: 'Descripcion del producto'
    })
    @IsNotEmpty()
    readonly descripcion: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'Unidad de medida'
    })
    @IsNotEmpty()
    readonly unidad_medida: string;

    @ApiProperty({
        type: Number,
        required: true,
        description: 'Cantidad actual (Stock)'
    })
    @IsNotEmpty()
    readonly cantidad: number
    
    @ApiProperty({
        type: Number,
        required: true,
        description: 'Precio del producto'
    })
    @IsNotEmpty()
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