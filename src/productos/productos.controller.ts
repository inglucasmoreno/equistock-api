import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProductosUpdateDTO } from './dto/productos-update.dto';
import { ProductosDTO } from './dto/productos.dto';
import { ProductosService } from './productos.service';

@ApiTags('Productos')
@Controller('productos')
export class ProductosController {
    constructor( private productosService: ProductosService ){}

    // Producto por ID
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Producto obtenido correctamente' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @ApiParam({name: 'id', required: true, description: 'Identificador de producto', type: 'string'})
    @Get('/:id')
    async getProducto(@Res() res, @Param('id') productoID) {
        const producto = await this.productosService.getProducto(productoID);
        res.status(HttpStatus.OK).json({
            message: 'Producto obtenido correctamente',
            producto
        });
    }

    // Producto por codigo
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Producto obtenido correctamente' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @ApiParam({name: 'id', required: true, description: 'Identificador de producto', type: 'string'})
        @Get('/:id')
    async getProductoPorCodigo(@Res() res, @Param('codigo') productoCodigo) {
        const producto = await this.productosService.getProductoPorCodigo(productoCodigo);
        res.status(HttpStatus.OK).json({
            message: 'Producto obtenido correctamente',
            producto
        });
    }

    // Listar productos
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Listado de productos correcto' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @Get('/')
    async listarProductos(@Res() res, @Query() querys) {
        const productos = await this.productosService.listarProductos(querys);
        res.status(HttpStatus.OK).json({
            message: 'Listado de productos correcto',
            productos
        });
    }

    // Crear producto
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiCreatedResponse({ description: 'Producto creado correctamente' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @ApiBody({ type: ProductosDTO })
    @Post('/')
    async crearProducto(@Res() res, @Body() productoDTO: ProductosDTO ) {
        const producto = await this.productosService.crearProducto(productoDTO);        
        res.status(HttpStatus.CREATED).json({
            message: 'Producto creado correctamente',
            producto
        });
    }

    // Actualizar producto
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Producto actualizado correctamente' })
    @ApiUnauthorizedResponse({ description: 'El usuario no esta autorizado para realizar esta accion' })
    @ApiParam({name: 'id', required: true, description: 'Identificador de producto', type: 'string'})
    @Put('/:id')
    async actualizarProducto(@Res() res, @Body() productoUpdateDTO: ProductosUpdateDTO, @Param('id') productoID ) {

        const producto = await this.productosService.actualizarProducto(productoID, productoUpdateDTO);

        res.status(HttpStatus.OK).json({
            message: 'Producto actualizado correctamente',
            producto
        });

    }
}
