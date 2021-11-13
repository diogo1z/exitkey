import { Module } from '@nestjs/common';
import { CategoriaEmpresaModule } from './categoria-empresa/categoria-empresa.module';

@Module({
  imports: [CategoriaEmpresaModule],
})
export class AppModule {}
