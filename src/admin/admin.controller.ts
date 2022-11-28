import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { AdminService } from './admin.service';
import { AddAdminDTO } from './dto/add-admin.dto';
import { UpdateAdminDTO } from './dto/update-admin.dto';

@Controller('admin')
@UseGuards(AuthGuard('jwt'))
export class AdminController {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    private adminService: AdminService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  async add(@Body() addAdminDTO: AddAdminDTO) {
    const { name, email, password } = addAdminDTO;

    return this.adminService.add({
      name,
      email,
      password,
      role: 1,
    });
  }

  @Get()
  findAll(): Promise<Admin[]> {
    return this.adminRepository.find();
  }

  @Get(':id')
  findOneById(id: any): Promise<Admin> {
    return this.adminService.findOneById(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateAdminDTO: UpdateAdminDTO) {
    return this.adminService.update(id, updateAdminDTO);
  }

  @Delete(':id')
  async delete(@Param('id') id): Promise<void> {
    await this.adminRepository.delete(id);
  }
}
