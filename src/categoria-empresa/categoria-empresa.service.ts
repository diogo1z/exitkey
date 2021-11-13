import { Injectable, Logger } from '@nestjs/common';
import { CriarCategoriaEmpresaDto } from './dto/criar-categoria-empresa.dto';

@Injectable()
export class CategoriaEmpresaService {
  private logger = new Logger('CategoriaEmpresaService');

  async criarCategoriaEmpresa(
    criarCategoriaEmpresaDto: CriarCategoriaEmpresaDto,
  ) {
    this.logger.log(criarCategoriaEmpresaDto, 'log service');
  }
}
