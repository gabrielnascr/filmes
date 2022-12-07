import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { AdminService } from '../../admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import { Admin as AdminEntity } from '../../admin/admin.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('AuthService', () => {
  let authService: AuthService;
  let adminService: AdminService;
  let jwtService: JwtService;
  let adminRepository: Repository<AdminEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        AdminService,
        JwtService,
        {
          provide: getRepositoryToken(AdminEntity),
          useValue: {
            find: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    adminService = module.get<AdminService>(AdminService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(adminService).toBeDefined();
    expect(jwtService).toBeDefined();
  });
});
