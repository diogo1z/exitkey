import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CompanyEntity } from './company.entity';
import { CompanyService } from './company.service';
import { CreateCompanyDTO } from './dto/create-company';

const companiesList = [
  { id: '1', name: 'task-1', classification: 'a' },
  { id: '2', name: 'task-2', classification: '0' },
  { id: '3', name: 'task-3', classification: '0' },
];

const newCompany = {
  name: 'new-task',
  classification: '0',
  id: '10',
};

const mockFnFindOneByRepository = (value) => {
  if (value.id === companiesList[0].id || value === companiesList[0].id) {
    return companiesList[0];
  } else {
    return null;
  }
};

describe('CompanyService', () => {
  let service: CompanyService;
  let repository: Repository<CompanyEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: getRepositoryToken(CompanyEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(companiesList),
            save: jest.fn().mockResolvedValue(newCompany),
            findOneBy: jest.fn().mockImplementation(mockFnFindOneByRepository),
            delete: jest.fn().mockResolvedValue(companiesList[0]),
          },
        },
      ],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
    repository = module.get<Repository<CompanyEntity>>(
      getRepositoryToken(CompanyEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new companies  successfully', async () => {
      // Arrange
      const body: CreateCompanyDTO = {
        name: 'new-task',
        classification: '0',
      };

      // Act
      const result = await service.create(body);

      // Assert
      expect(result).toEqual(newCompany);
      expect(repository.save).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      // Arrange
      const body: CreateCompanyDTO = {
        name: 'new-task',
        classification: '0',
      };

      jest.spyOn(repository, 'save').mockRejectedValueOnce(new Error());

      // Assert
      expect(service.create(body)).rejects.toThrowError();
    });
  });

  describe('get', () => {
    it('should get a companies successfully', async () => {
      // Arrange
      const id = companiesList[0].id;

      // Act
      const result = await service.getById(id);

      // Assert
      expect(result).toEqual(companiesList[0]);
      expect(repository.findOneBy).toHaveBeenCalledTimes(1);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id });
    });

    it('should list all companies successfully', async () => {
      // Act
      const result = await service.list();

      // Assert
      expect(result).toEqual(companiesList);
      expect(repository.find).toHaveBeenCalledTimes(1);
      expect(repository.find).toHaveBeenCalledWith();
    });
  });

  describe('delete', () => {
    it('should delete a company successfully', async () => {
      // Arrange
      const id = companiesList[0].id;

      // Act
      const result = await service.deleteById(id);

      // Assert
      expect(result).toEqual(companiesList[0]);

      expect(repository.findOneBy).toHaveBeenCalledTimes(1);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id });
      expect(repository.delete).toHaveBeenCalledTimes(1);
      expect(repository.delete).toHaveBeenCalledWith({ id });
    });

    it('should not delete a company when not exists', async () => {
      // Arrange
      const id = 'fdfasdfjsdklfjsdkljsdklf';

      // Act
      const result = await service.deleteById(id);

      // Assert
      expect(result).toBeNull();

      expect(repository.findOneBy).toHaveBeenCalledTimes(1);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id });
      expect(repository.delete).toHaveBeenCalledTimes(0);
    });
  });
});
