import {
  Body,
  Controller,
  Injectable,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateDTO } from './dto/authenticate-dto';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async authenticate(@Body() authenticateDTO: AuthenticateDTO) {
    return this.authService.authenticacte(authenticateDTO);
  }
}
