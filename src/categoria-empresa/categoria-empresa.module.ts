import { Module } from '@nestjs/common';
import { CategoriaEmpresaController } from './categoria-empresa.controller';
import { CategoriaEmpresaService } from './categoria-empresa.service';

@Module({
  controllers: [CategoriaEmpresaController],
  providers: [CategoriaEmpresaService],
})
export class CategoriaEmpresaModule {}
