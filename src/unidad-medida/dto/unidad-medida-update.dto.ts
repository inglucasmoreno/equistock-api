import { ApiProperty } from "@nestjs/swagger";

export class UnidadMedidaUpdateDTO {
    
    @ApiProperty({
        type: String,
        description: 'Descripcion de la unidad de medida'
    })
    readonly descripcion: string;
    
    @ApiProperty({
        type: Boolean,
        description: 'Unidad de medida habilitada'
    })
    readonly activo: boolean;

}