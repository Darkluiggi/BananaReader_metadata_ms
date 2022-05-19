import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorRepository } from 'src/modules/author/author.repository';
import { GenreRepository } from 'src/modules/genre/genre.repository';
import { BookRepository } from './book.repository';

import { BookController } from './controllers/book.controller';
import { Book } from './entities/book.entity';
import { BookService } from './services/book.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookRepository, AuthorRepository, GenreRepository])
  ],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {}
