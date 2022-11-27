import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { AdminService } from 'src/admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import { AuthenticateDTO } from './dto/authenticate-dto';

interface JWTPayload {
  sub: number;
  name: string;
  email: string;
  role: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async authenticacte({ email, password }: AuthenticateDTO) {
    const userData = await this.validateUser(email, password);

    const jwtPayload: JWTPayload = {
      ...userData,
      sub: userData.id,
    };

    return {
      token: this.jwtService.sign(jwtPayload),
      loggedUser: userData,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.adminService.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException('This admin is not found.');
    }

    const isValidPassword = await compareSync(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Wrong password');
    }

    return user;
  }
}
