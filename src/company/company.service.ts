import { Injectable, Logger } from '@nestjs/common';
import { ICompany } from './interfaces/company.interface';
import { CreateCompanyDTO } from './dto/create-company';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from './company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService {
  private readonly logger = new Logger(CompanyService.name);

  constructor(
    @InjectRepository(CompanyEntity)
    private companyRepository: Repository<CompanyEntity>,
  ) {}

  async create(createCompanyDTO: CreateCompanyDTO): Promise<ICompany> {
    const { name, classification, id } = await this.companyRepository.save(
      createCompanyDTO,
    );

    return { name, classification, id };
  }

  async getById(id: string): Promise<ICompany> {
    const company = await this.companyRepository.findOneBy({ id });
    console.log(company);
    return company;
  }

  async deleteById(id: string): Promise<ICompany> {
    const company = await this.companyRepository.delete({ id });
    console.log(company.raw, company.affected, company);
    return company.raw;
  }

  async list(): Promise<ICompany[]> {
    const companies = await this.companyRepository.find();
    console.log(companies);
    return companies;
  }
}
