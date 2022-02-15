import { Module } from '@nestjs/common';
import { UnidadMedidaController } from './unidad-medida.controller';
import { UnidadMedidaService } from './unidad-medida.service';
import { MongooseModule } from '@nestjs/mongoose';
import { unidadMedidaSchema } from './schema/unidad-medida.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Unidad', schema: unidadMedidaSchema}])],
  controllers: [UnidadMedidaController],
  providers: [UnidadMedidaService]
})
export class UnidadMedidaModule {}
