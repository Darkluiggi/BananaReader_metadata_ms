import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageController } from './controllers/language.controller';
import { LanguageRepository } from './language.repository';
import { LanguageService } from './services/language.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LanguageRepository])
  ],
  controllers: [LanguageController],
  providers: [LanguageService]
})
export class LanguageModule {}
