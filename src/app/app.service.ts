import { Injectable } from '@nestjs/common';
import { AppModule } from './app.module';
import { Configuration } from '../config/config.keys';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AppService {
  getHello(){
    return "Hello";
  }
}
