import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductosUpdateDTO } from './dto/productos-update.dto';
import { ProductosDTO } from './dto/productos.dto';
import { IProductos } from './interface/productos.interface';

@Injectable()
export class ProductosService {

    constructor(@InjectModel('Producto') private readonly productoModel: Model<IProductos>){}

    // Producto por ID
    async getProducto(id: string): Promise<IProductos> {
        const producto = await this.productoModel.findById(id);
        if(!producto) throw new NotFoundException('Le producto no existe');
        return producto;
    }

    // Producto por descripcion
    async getProductoPorCodigo(codigo: string): Promise<IProductos> {
        const producto = await this.productoModel.findOne({ codigo });
        return producto;
    }

    // Listar productos
    async listarProductos(querys: any): Promise<IProductos[]> {
        const { columna, direccion } = querys;
        let ordenar = [ columna || 'descripcion', direccion || 1 ];
        const productos = await this.productoModel.find().sort([ordenar]);
        return productos;
    }

    // Crear producto
    async crearProducto(productoDTO: ProductosDTO): Promise<IProductos> {

        const { codigo } = productoDTO;

        // Verificamos si el producto ya existe
        let productoDB = await this.getProductoPorCodigo(codigo);
        if(productoDB) throw new NotFoundException('El producto ya existe');

        const nuevoProducto = new this.productoModel(productoDTO);
        return await nuevoProducto.save();

    }

    // Actualizar producto
    async actualizarProducto(id: string, productoUpdateDTO: ProductosUpdateDTO): Promise<IProductos> {

        const { codigo } = productoUpdateDTO;

        // Se verifica si el producto a actualizar existe
        let productoDB = await this.getProducto(id);
        if(!productoDB) throw new NotFoundException('El producto no existe');

        // // Verificamos que el producto no este repetido
        if(codigo && productoDB.codigo.toLocaleLowerCase() !== codigo.toLowerCase()){
            const productoExiste = await this.getProductoPorCodigo(codigo);
            if(productoExiste) throw new NotFoundException('El producto, ya se encuentra registrada');
        }

        const producto = await this.productoModel.findByIdAndUpdate(id, productoUpdateDTO, { new: true });
        return producto;

    }

}
