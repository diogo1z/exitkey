import { Test, TestingModule } from '@nestjs/testing';
import { CreateCompanyDTO } from './dto/create-company';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { ICompany } from './interfaces/company.interface';

const companiesList: ICompany[] = [
  { id: '1', name: 'task-1', classification: 'a' },
  { id: '2', name: 'task-2', classification: '0' },
  { id: '3', name: 'task-3', classification: '0' },
];

const newCompany = {
  name: 'new-task',
  classification: '0',
  id: '10',
};

const updatedCompany: ICompany = {
  id: '1',
  name: 'task-1',
  classification: 'c',
};

describe('CompanyController', () => {
  let companyController: CompanyController;
  let companyService: CompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [
        {
          provide: CompanyService,
          useValue: {
            list: jest.fn().mockResolvedValue(companiesList),
            create: jest.fn().mockResolvedValue(newCompany),
            getById: jest.fn().mockResolvedValue(companiesList[0]),
            update: jest.fn().mockResolvedValue(updatedCompany),
            deleteById: jest.fn().mockResolvedValue(companiesList[0]),
          },
        },
      ],
    }).compile();

    companyController = module.get<CompanyController>(CompanyController);
    companyService = module.get<CompanyService>(CompanyService);
  });

  it('should be defined', () => {
    expect(companyController).toBeDefined();
    expect(companyService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new companies  successfully', async () => {
      // Arrange
      const body: CreateCompanyDTO = {
        name: 'new-task',
        classification: '0',
      };

      // Act
      const result = await companyController.create(body);

      // Assert
      expect(result).toEqual(newCompany);
      expect(companyService.create).toHaveBeenCalledTimes(1);
      expect(companyService.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      // Arrange
      const body: CreateCompanyDTO = {
        name: 'new-task',
        classification: '0',
      };

      jest.spyOn(companyService, 'create').mockRejectedValueOnce(new Error());

      // Assert
      expect(companyController.create(body)).rejects.toThrowError();
    });
  });

  describe('get', () => {
    it('should get a companies successfully', async () => {
      // Arrange
      const id = companiesList[0].id;

      // Act
      const result = await companyController.get(id);

      // Assert
      expect(result).toEqual(companiesList[0]);
      expect(companyService.getById).toHaveBeenCalledTimes(1);
      expect(companyService.getById).toHaveBeenCalledWith(id);
    });

    it('should list all companies successfully', async () => {
      // Act
      const result = await companyController.list();

      // Assert
      expect(result).toEqual(companiesList);
      expect(companyService.list).toHaveBeenCalledTimes(1);
      expect(companyService.list).toHaveBeenCalledWith();
    });
  });

  describe('delete', () => {
    it('should delete a companies successfully', async () => {
      // Arrange
      const id = companiesList[0].id;

      // Act
      const result = await companyController.delete(id);

      // Assert
      expect(result).toEqual(companiesList[0]);
      expect(companyService.deleteById).toHaveBeenCalledTimes(1);
      expect(companyService.deleteById).toHaveBeenCalledWith(id);
    });
  });
});
