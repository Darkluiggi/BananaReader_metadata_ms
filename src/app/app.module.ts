import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorModule } from '../modules/author/author.module';
import { BookModule } from '../modules/book/book.module';
import { Configuration } from '../config/config.keys';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { DatabaseModule } from '../database/database.module';
import { GenreModule } from '../modules/genre/genre.module';
import { LanguageModule } from 'src/modules/language/language.module';
import { NarratorModule } from 'src/modules/narrator/narrator.module';
import { ReadingModule } from 'src/modules/reading/reading.module';

@Module({
  imports: [ConfigModule, DatabaseModule, BookModule, AuthorModule, GenreModule, LanguageModule, NarratorModule, ReadingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly _configService: ConfigService){
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
