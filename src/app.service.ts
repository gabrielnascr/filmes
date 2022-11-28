import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      name: 'Filmes API',
      version: '1.0',
    };
  }
}
