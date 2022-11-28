import {
  Body,
  Controller,
  Get,
  Injectable,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateDTO } from './dto/authenticate-dto';
import { AuthGuard } from '@nestjs/passport';
import { AdminService } from 'src/admin/admin.service';
import { SignUpDTO } from './dto/signup-dto';

@Injectable()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly adminService: AdminService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async authenticate(@Body() authenticateDTO: AuthenticateDTO) {
    return this.authService.authenticacte(authenticateDTO);
  }

  @Post('signup')
  async signup(@Body() signUpDTO: SignUpDTO) {
    return this.adminService.add(signUpDTO);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async profile(@Req() request) {
    return this.adminService.findOneById(request.user.sub);
  }
}
