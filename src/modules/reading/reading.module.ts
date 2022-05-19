import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookRepository } from '../book/book.repository';
import { LanguageRepository } from '../language/language.repository';
import { NarratorRepository } from '../narrator/narrator.repository';
import { ReadingController } from './controllers/reading.controller';
import { ReadingRepository } from './reading.repository';
import { ReadingService } from './services/reading.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReadingRepository, NarratorRepository, BookRepository, LanguageRepository])
  ],
  controllers: [ReadingController],
  providers: [ReadingService]
})
export class ReadingModule {}
