import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { AddAdminDTO } from './dto/add-admin.dto';
import { UpdateAdminDTO } from './dto/update-admin.dto';

import { hash } from 'bcrypt';

enum ErrorMessages {
  NOT_FOUND = 'This administrator does not exist in our data',
}

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
  ) {}

  async add(addAdminDTO: AddAdminDTO) {
    const userAlreadyExists = await this.adminRepository.findOneBy({
      email: addAdminDTO.email,
    });

    if (userAlreadyExists) {
      throw new ConflictException('This admin already registered');
    }

    const passwordEncrypted = await hash(addAdminDTO.password, 8);

    return this.adminRepository.save({
      ...addAdminDTO,
      password: passwordEncrypted,
    });
  }

  async findOneById(id: number): Promise<Admin> {
    return this.adminRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string): Promise<Admin> {
    return this.adminRepository.findOneBy({ email });
  }

  async update(id: number, updateAdminDTO: UpdateAdminDTO): Promise<void> {
    const adminExists = await this.adminRepository.findOneBy({ id });

    if (!adminExists) {
      throw new HttpException(
        'This administrator does not exist in our data',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.adminRepository.update({ id }, updateAdminDTO);
  }

  async remove(id: number): Promise<void> {
    const adminExists = await this.adminRepository.findOneBy({ id });

    if (!adminExists) {
      throw new NotFoundException(ErrorMessages.NOT_FOUND);
    }

    await this.adminRepository.delete(adminExists);
  }
}
