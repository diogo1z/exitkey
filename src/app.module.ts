import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { EmpresaModule } from './empresa/empresa.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), EmpresaModule],
})
export class AppModule {}
