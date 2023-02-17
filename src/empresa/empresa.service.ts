import { Injectable, Logger } from '@nestjs/common';
import { IEmpresa } from './interfaces/empresa.interface';
import { CriarEmpresaDTO } from './dto/criar-empresa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EmpresaEntity } from './empresa.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmpresaService {
  private readonly logger = new Logger(EmpresaService.name);

  constructor(
    @InjectRepository(EmpresaEntity)
    private empresaRepository: Repository<EmpresaEntity>,
  ) {}

  async criarEmpresa(criarEmpresaDto: CriarEmpresaDTO): Promise<IEmpresa> {
    const { nome, classificacao, id } = await this.empresaRepository.save(
      criarEmpresaDto,
    );

    return { nome, classificacao, id };
  }

  async obterPorId(id: string): Promise<IEmpresa> {
    const empresa = await this.empresaRepository.findOneBy({ id });
    console.log(empresa);
    return empresa;
  }

  async deletarPorId(id: string): Promise<IEmpresa> {
    const empresa = await this.empresaRepository.delete({ id });
    console.log(empresa.raw, empresa.affected, empresa);
    return empresa.raw;
  }

  async listarEmpresas(): Promise<IEmpresa[]> {
    const empresas = await this.empresaRepository.find();
    console.log(empresas);
    return empresas;
  }
}
