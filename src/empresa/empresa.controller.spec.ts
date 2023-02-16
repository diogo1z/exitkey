import { Test, TestingModule } from '@nestjs/testing';
import { CriarEmpresaDTO } from './dto/criar-empresa.dto';
import { EmpresaController } from './empresa.controller';
import { EmpresaService } from './empresa.service';
import { IEmpresa } from './interfaces/empresa.interface';

const empresaList: IEmpresa[] = [
  { id: '1', nome: 'task-1', classificacao: 'a' },
  { id: '2', nome: 'task-2', classificacao: '0' },
  { id: '3', nome: 'task-3', classificacao: '0' },
];

const newEmpresa = {
  nome: 'new-task',
  classificacao: '0',
  id: '10',
};

const updatedEmpresa: IEmpresa = {
  id: '1',
  nome: 'task-1',
  classificacao: 'c',
};

describe('EmpresaController', () => {
  let empresaController: EmpresaController;
  let empresaService: EmpresaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmpresaController],
      providers: [
        {
          provide: EmpresaService,
          useValue: {
            listarEmpresas: jest.fn().mockResolvedValue(empresaList),
            criarEmpresa: jest.fn().mockResolvedValue(newEmpresa),
            obterPorId: jest.fn().mockResolvedValue(empresaList[0]),
            update: jest.fn().mockResolvedValue(updatedEmpresa),
            deletarPorId: jest.fn().mockResolvedValue(empresaList[0]),
          },
        },
      ],
    }).compile();

    empresaController = module.get<EmpresaController>(EmpresaController);
    empresaService = module.get<EmpresaService>(EmpresaService);
  });

  it('should be defined', () => {
    expect(empresaController).toBeDefined();
    expect(empresaService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new companies  successfully', async () => {
      // Arrange
      const body: CriarEmpresaDTO = {
        nome: 'new-task',
        classificacao: '0',
      };

      // Act
      const result = await empresaController.criarEmpresa(body);

      // Assert
      expect(result).toEqual(newEmpresa);
      expect(empresaService.criarEmpresa).toHaveBeenCalledTimes(1);
      expect(empresaService.criarEmpresa).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      // Arrange
      const body: CriarEmpresaDTO = {
        nome: 'new-task',
        classificacao: '0',
      };

      jest
        .spyOn(empresaService, 'criarEmpresa')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(empresaController.criarEmpresa(body)).rejects.toThrowError();
    });
  });

  describe('get', () => {
    it('should get a companies successfully', async () => {
      // Arrange
      const id = empresaList[0].id;

      // Act
      const result = await empresaController.obterEmpresa(id);

      // Assert
      expect(result).toEqual(empresaList[0]);
      expect(empresaService.obterPorId).toHaveBeenCalledTimes(1);
      expect(empresaService.obterPorId).toHaveBeenCalledWith(id);
    });

    it('should list all companies successfully', async () => {
      // Act
      const result = await empresaController.listarEmpresas();

      // Assert
      expect(result).toEqual(empresaList);
      expect(empresaService.listarEmpresas).toHaveBeenCalledTimes(1);
      expect(empresaService.listarEmpresas).toHaveBeenCalledWith();
    });
  });

  describe('delete', () => {
    it('should delete a companies successfully', async () => {
      // Arrange
      const id = empresaList[0].id;

      // Act
      const result = await empresaController.deletarEmpresa(id);

      // Assert
      expect(result).toEqual(empresaList[0]);
      expect(empresaService.deletarPorId).toHaveBeenCalledTimes(1);
      expect(empresaService.deletarPorId).toHaveBeenCalledWith(id);
    });
  });
});
