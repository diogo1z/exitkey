import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaEmpresaModule } from './categoria-empresa/categoria-empresa.module';
import { typeOrmConfig } from './configs/typeorm.config';
import { EmpresaModule } from './empresa/empresa.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    CategoriaEmpresaModule,
    EmpresaModule,
  ],
})
export class AppModule {}
