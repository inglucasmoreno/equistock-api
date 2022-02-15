import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UnidadMedidaUpdateDTO } from './dto/unidad-medida-update.dto';
import { UnidadMedidaDTO } from './dto/unidad-medida.dto';
import { IUnidadMedida } from './interface/unidad-medida.interface';

@Injectable()
export class UnidadMedidaService {


    constructor(@InjectModel('Unidad') private readonly unidadMedidaModel: Model<IUnidadMedida>){}

    // Unidad de medida por ID
    async getUnidadMedida(id: string): Promise<IUnidadMedida> {
        const unidad = await this.unidadMedidaModel.findById(id);
        if(!unidad) throw new NotFoundException('La unidad de medida no existe');
        return unidad;
    }

    // Unidad de medida por descripcion
    async getUnidadMedidaPorDescripcion(descripcion: string): Promise<IUnidadMedida> {
        const unidad = await this.unidadMedidaModel.findOne({ descripcion });
        return unidad;
    }

    // Listar unidades de medida
    async listarUnidades(querys: any): Promise<IUnidadMedida[]> {
        const { columna, direccion } = querys;
        let ordenar = [ columna || 'descripcion', direccion || 1 ];
        const unidades = await this.unidadMedidaModel.find().sort([ordenar]);
        return unidades;
    }

    // Crear unidad de medida
    async crearUnidad(unidadMedidaDTO: UnidadMedidaDTO): Promise<IUnidadMedida> {

        const { descripcion } = unidadMedidaDTO;

        // Verificamos si la unidad de medida ya existe
        let unidadMedidaDB = await this.getUnidadMedidaPorDescripcion(descripcion);
        if(unidadMedidaDB) throw new NotFoundException('La unidad de medida ya existe');

        const nuevaUnidad = new this.unidadMedidaModel(unidadMedidaDTO);
        return await nuevaUnidad.save();

    }

    // Actualizar unidad
    async actualizarUnidad(id: string, unidadMedidaUpdateDTO: UnidadMedidaUpdateDTO): Promise<IUnidadMedida> {

        const { descripcion } = unidadMedidaUpdateDTO;

        // Se verifica si la unidad a actualizar existe
        let unidadMedidaDB = await this.getUnidadMedida(id);
        if(!unidadMedidaDB) throw new NotFoundException('La unidad de medida no existe');

        // // Verificamos que la unidad no este repetida
        if(descripcion && unidadMedidaDB.descripcion.toLocaleLowerCase() !== descripcion.toLowerCase()){
            const unidadExiste = await this.getUnidadMedidaPorDescripcion(descripcion);
            if(unidadExiste) throw new NotFoundException('La unidad de medida, ya se encuentra registrada');
        }

        const unidad = await this.unidadMedidaModel.findByIdAndUpdate(id, unidadMedidaUpdateDTO, { new: true });
        return unidad;

    }

}
