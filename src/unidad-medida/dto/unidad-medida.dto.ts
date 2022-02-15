import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UnidadMedidaDTO {

    @ApiProperty({
        type: String,
        required: true,
        description: 'Descripcion de la unidad de medida'
    })
    @IsNotEmpty()
    readonly descripcion: string;

    @ApiProperty({
        type: Boolean,
        default: true,
        description: 'Unidad de medida habilitada'
    })
    readonly activo: boolean;

}