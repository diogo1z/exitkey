import { Controller, Post, Get, Body } from '@nestjs/common';
import { CriarCategoriaEmpresaDto } from './dto/criar-categoria-empresa.dto';
import { CategoriaEmpresaService } from './categoria-empresa.service';

@Controller('api/v1/categoria-empresa')
export class CategoriaEmpresaController {
  constructor(
    private readonly categoriaEmpresaService: CategoriaEmpresaService,
  ) {}

  @Post()
  async criarCategoriaEmpresa(
    @Body() criarCategoriaEmpresaDto: CriarCategoriaEmpresaDto,
  ) {
    return JSON.stringify({
      nome: 'diogo',
      ...criarCategoriaEmpresaDto,
    });
  }

  @Get()
  async listarCategoriasEmpresas() {
    await this.categoriaEmpresaService.criarCategoriaEmpresa({
      nome: 'teste',
    });

    return JSON.stringify({
      nome: 'diogo',
    });
  }
}
