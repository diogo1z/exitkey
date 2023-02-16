import { Injectable, Logger } from '@nestjs/common';
import { IEmpresa } from './interfaces/empresa.interface';
import { CriarEmpresaDTO } from './dto/criar-empresa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EmpresaEntity } from './empresa.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmpresaService {
  private empresas: IEmpresa[] = [];
  private readonly logger = new Logger(EmpresaService.name);

  constructor(
    @InjectRepository(EmpresaEntity)
    private empresaRepository: Repository<EmpresaEntity>,
  ) {}

  async criarEmpresa(criarEmpresaDto: CriarEmpresaDTO): Promise<IEmpresa> {
    this.logger.log(criarEmpresaDto, 'log service');
    return await this.criar(criarEmpresaDto);
  }

  private async criar(criarEmpresaDto: CriarEmpresaDTO): Promise<IEmpresa> {
    const { nome, classificacao, id } = await this.empresaRepository.save(
      criarEmpresaDto,
    );

    this.empresas.push({ nome, classificacao, id });

    return { nome, classificacao, id };
  }

  async obterPorId(id: string): Promise<IEmpresa> {
    return this.empresas.find((empresa) => empresa.id === id);
  }

  async deletarPorId(id: string): Promise<IEmpresa> {
    const empresa = await this.obterPorId(id);
    if (empresa) {
      this.empresas = this.empresas.filter((empresa) => empresa.id !== id);
    }

    return empresa;
  }

  async listarEmpresas(): Promise<IEmpresa[]> {
    return this.empresas;
  }
}
