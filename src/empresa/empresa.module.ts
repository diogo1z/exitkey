import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpresaController } from './empresa.controller';
import { EmpresaEntity } from './empresa.entity';
import { EmpresaRepository } from './empresa.repository';
import { EmpresaService } from './empresa.service';

@Module({
  imports: [TypeOrmModule.forFeature([EmpresaRepository, EmpresaEntity])],
  controllers: [EmpresaController],
  providers: [EmpresaService],
})
export class EmpresaModule {}
