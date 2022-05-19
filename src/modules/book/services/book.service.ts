import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { AuthorRepository } from 'src/modules/author/author.repository';
import { Author } from 'src/modules/author/entities/author.entity';
import { Genre } from 'src/modules/genre/entities/genre.entity';
import { GenreRepository } from 'src/modules/genre/genre.repository';
import { In } from 'typeorm';
import { BookRepository } from '../book.repository';
import { CreateBookDTO, ReadBookDTO, UpdateBookDTO } from '../dtos';
import { AddDTO } from '../dtos/add.dto';
import { Book } from '../entities/book.entity';

@Injectable()
export class BookService {
    constructor (
        @InjectRepository(BookRepository)
        private readonly _bookRepository: BookRepository,
        @InjectRepository(AuthorRepository)
        private readonly _authorRepository: AuthorRepository,
        @InjectRepository(GenreRepository)
        private readonly _genreRepository: GenreRepository
    ){}
    
    async getAll(): Promise<ReadBookDTO[]>{ 
        const books = await this._bookRepository.find();
        if (!books){
            throw new NotFoundException('No hay libros');
        }
        return books.map(book => plainToClass(ReadBookDTO, book));
    }
    
    async getById(id: number): Promise<ReadBookDTO>{
        if (!id){
            throw new BadRequestException('Se necesita el ID del libro');
        } 
        const book = await this._bookRepository.findOne(id);
        if (!book){
            throw new NotFoundException('El libro no existe');
        }
        return plainToClass(ReadBookDTO, book);
    }
    
    async getBookByGemre(id_genre: number): Promise<ReadBookDTO[]>{
        if (!id_genre){
            throw new BadRequestException('Es necesario el ID del genero');
        } 
        const books: Book[] = await this._bookRepository.find({
            where: {status: 'ACTIVE', books: In([id_genre])}, 
        });
        return books.map(book => plainToClass(ReadBookDTO, book));
    }

    async getBookByAuthor(id_author: number): Promise<ReadBookDTO[]>{
        if (!id_author){
            throw new BadRequestException('Es necesario el ID del autor');
        } 
        const books: Book[] = await this._bookRepository.find({
            where: {status: 'ACTIVE', books: In([id_author])}, 
        });
        return books.map(book => plainToClass(ReadBookDTO, book));
    }
    
    async create(book: Partial<CreateBookDTO>): Promise<ReadBookDTO>{
        const authors = await this._authorRepository.findByIds(book.authorIds);
        const genres = await this._genreRepository.findByIds(book.genreIds);
        const savedBook: Book = await this._bookRepository.save({
            title: book.title,
            sinopsis: book.sinopsis,
            year: book.year,
            authors: authors,
            genres: genres 
        }); 
        return plainToClass(ReadBookDTO, savedBook);
    }

    async update(
        id: number, book: Partial<UpdateBookDTO>
    ): Promise<ReadBookDTO>{
        const bookExists = await this._bookRepository.findOne(id, {
            where: {status: 'ACTIVE'},
        });
        if (!bookExists){
            throw new NotFoundException('Libro no encontrado');
        }
        const updatedBook = await this._bookRepository.update(id, book);
    
        return plainToClass(ReadBookDTO, updatedBook);
    }
    
    
    async delete(id: number): Promise<void>{
        const bookExists = await this._bookRepository.findOne(id, {
            where: {status: 'ACTIVE'},
        });
        if (!bookExists){
            throw new NotFoundException('Ese libro no existe');
        }
        await this._bookRepository.update(id, {status: 'UNACTIVE'});
    }
}
