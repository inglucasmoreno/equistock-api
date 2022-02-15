import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UnidadMedidaUpdateDTO } from './dto/unidad-medida-update.dto';
import { UnidadMedidaDTO } from './dto/unidad-medida.dto';
import { UnidadMedidaService } from './unidad-medida.service';

@ApiTags('Unidad de medida')
@Controller('unidad-medida')
export class UnidadMedidaController {

    constructor( private unidadMedidaService: UnidadMedidaService ){}

    // Unidad por ID
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Unidad obtenido correctamente' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @ApiParam({name: 'id', required: true, description: 'Identificador de unidad', type: 'string'})
    @Get('/:id')
    async getUnidadMedida(@Res() res, @Param('id') unidadID) {
        const unidadMedida = await this.unidadMedidaService.getUnidadMedida(unidadID);
        res.status(HttpStatus.OK).json({
            message: 'Unidad obtenido correctamente',
            unidad: unidadMedida
        });
    }

    // Listar unidades de medida
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Listado de unidades correcto' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @Get('/')
    async listarUnidades(@Res() res, @Query() querys) {
        const unidades = await this.unidadMedidaService.listarUnidades(querys);
        res.status(HttpStatus.OK).json({
            message: 'Listado de unidades correcto',
            unidades
        });
    }

    // Crear unidad de medida
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiCreatedResponse({ description: 'Unidad creada correctamente' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @ApiBody({ type: UnidadMedidaDTO })
    @Post('/')
    async crearUnidad(@Res() res, @Body() unidadMedidaDTO: UnidadMedidaDTO ) {
        const unidad = await this.unidadMedidaService.crearUnidad(unidadMedidaDTO);        
        res.status(HttpStatus.CREATED).json({
            message: 'Unidad creada correctamente',
            unidad
        });
    }

    // Actualizar unidad
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Unidad actualizada correctamente' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @ApiParam({name: 'id', required: true, description: 'Identificador de unidad', type: 'string'})
    @Put('/:id')
    async actualizarUnidad(@Res() res, @Body() unidadMedidaUpdateDTO: UnidadMedidaUpdateDTO, @Param('id') unidadID ) {

        const unidad = await this.unidadMedidaService.actualizarUnidad(unidadID, unidadMedidaUpdateDTO);

        res.status(HttpStatus.OK).json({
            message: 'Usuario actualizado correctamente',
            unidad
        });

    }

}
