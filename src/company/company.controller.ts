import { Body, Controller, Post, Get, Param, Delete } from '@nestjs/common';
import { CreateCompanyDTO } from './dto/create-company';
import { CompanyService } from './company.service';

@Controller('api/v1/company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async create(@Body() createCompanyDTO: CreateCompanyDTO) {
    const company = await this.companyService.create(createCompanyDTO);
    return company;
  }

  @Get('get/:id')
  async get(@Param('id') id) {
    const company = await this.companyService.getById(id);
    return company;
  }

  @Delete(':id')
  async delete(@Param('id') id) {
    return await this.companyService.deleteById(id);
  }

  @Get('list')
  async list() {
    const companies = await this.companyService.list();
    return companies;
  }
}
