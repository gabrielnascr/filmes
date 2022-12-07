import {
  Body,
  Controller,
  Get,
  Injectable,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateDTO } from './dto/authenticate-dto';
import { AuthGuard } from '@nestjs/passport';
import { AdminService } from '../admin/admin.service';
import { SignUpDTO } from './dto/signup-dto';

@Injectable()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async authenticate(@Body() authenticateDTO: AuthenticateDTO) {
    return this.authService.authenticate(authenticateDTO);
  }

  @Post('signup')
  @UsePipes(ValidationPipe)
  async signup(@Body() signUpDTO: SignUpDTO) {
    return this.authService.signup(signUpDTO);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async profile(@Req() request) {
    return this.authService.profile(request.user.sub);
  }
}
