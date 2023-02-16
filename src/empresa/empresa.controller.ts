import { Body, Controller, Post, Get, Param, Delete } from '@nestjs/common';
import { CriarEmpresaDTO } from './dto/criar-empresa.dto';
import { EmpresaService } from './empresa.service';

@Controller('api/v1/empresa')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Post()
  async criarEmpresa(@Body() criarEmpresaDto: CriarEmpresaDTO) {
    const empresa = await this.empresaService.criarEmpresa(criarEmpresaDto);
    return empresa;
  }

  @Get('obter/:id')
  async obterEmpresa(@Param('id') id) {
    const empresas = await this.empresaService.obterPorId(id);
    return empresas;
  }

  @Delete(':id')
  async deletarEmpresa(@Param('id') id) {
    return await this.empresaService.deletarPorId(id);
  }

  @Get('listar')
  async listarEmpresas() {
    const empresas = await this.empresaService.listarEmpresas();
    return empresas;
  }
}
