import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorRepository } from './author.repository';

import { AuthorController } from './controllers/author.controller';
import { Author } from './entities/author.entity';
import { AuthorService } from './services/author.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthorRepository]), 
  ],
  controllers: [AuthorController],
  providers: [AuthorService]
})
export class AuthorModule {}
