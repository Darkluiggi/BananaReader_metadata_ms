import { Module } from '@nestjs/common';
import { NarratorService } from './services/narrator.service';
import { NarratorController } from './controllers/narrator.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NarratorRepository } from './narrator.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([NarratorRepository])
  ],
  providers: [NarratorService],
  controllers: [NarratorController]
})
export class NarratorModule {}
