import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin as AdminEntity } from '../admin.entity';
import { AdminService } from '../admin.service';

const adminMockedDataArray: AdminEntity[] = [
  {
    id: 1,
    email: 'gr153tt@gmail.com',
    name: 'Gabriel',
    password: '123',
    role: 1,
    lastLoginDate: new Date(),
    updatedAt: new Date().toDateString(),
    createdAt: new Date().toDateString(),
  },
  {
    id: 2,
    email: 'juliana@gmail.com',
    name: 'Juliana',
    password: '123',
    role: 1,
    lastLoginDate: new Date(),
    updatedAt: new Date().toDateString(),
    createdAt: new Date().toDateString(),
  },
];

describe('AdminService', () => {
  let adminService: AdminService;
  let adminRepository: Repository<AdminEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        {
          provide: getRepositoryToken(AdminEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(adminMockedDataArray),
          },
        },
      ],
    }).compile();

    adminService = module.get<AdminService>(AdminService);
    adminRepository = module.get<Repository<AdminEntity>>(
      getRepositoryToken(AdminEntity),
    );
  });

  it('should be defined', () => {
    expect(adminService).toBeDefined();
    expect(adminRepository).toBeDefined();
  });

  describe('return all admins', () => {
    it('should return all admins', async () => {
      const result = await adminService.findAll();

      expect(result).toEqual(adminMockedDataArray);
      expect(adminRepository.find).toHaveBeenCalledTimes(1);
    });
  });
});
