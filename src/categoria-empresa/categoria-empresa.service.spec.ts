import { Test, TestingModule } from '@nestjs/testing';
import { CategoriaEmpresaService } from './categoria-empresa.service';

describe('CategoriaEmpresaService', () => {
  let service: CategoriaEmpresaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriaEmpresaService],
    }).compile();

    service = module.get<CategoriaEmpresaService>(CategoriaEmpresaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
