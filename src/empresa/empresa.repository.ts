import { EntityRepository, Repository } from 'typeorm';
import { EmpresaEntity } from './empresa.entity';
import { CriarEmpresaDTO } from './dto/criar-empresa.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(EmpresaEntity)
export class EmpresaRepository extends Repository<EmpresaEntity> {
  async criarEmpresa(criarEmpresaDTO: CriarEmpresaDTO): Promise<EmpresaEntity> {
    const { nome, classificacao } = criarEmpresaDTO;
    console.log('teste 3');
    const empresa = this.create();
    empresa.nome = nome;
    empresa.classificacao = classificacao;

    try {
      await empresa.save();
      return empresa;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('Nome já está em uso');
      } else {
        throw new InternalServerErrorException(
          'Erro ao salvar o empresa no banco de dados',
        );
      }
    }
  }
}
