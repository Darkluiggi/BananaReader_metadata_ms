import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { BookRepository } from 'src/modules/book/book.repository';
import { Book } from 'src/modules/book/entities/book.entity';
import { In } from 'typeorm';
import { AuthorRepository } from '../author.repository';
import { CreateAuthorDTO, ReadAuthorDTO, UpdateAuthorDTO } from '../dtos';
import { Author } from '../entities/author.entity';

@Injectable()
export class AuthorService {
    constructor (
        @InjectRepository(AuthorRepository)
        private readonly _authorRepository: AuthorRepository
    ){}
    
    async getAll(): Promise<ReadAuthorDTO[]>{ 
        const authors = await this._authorRepository.find();
        if (!authors){
            throw new NotFoundException('No hay autores');
        }
        return authors.map(author => plainToClass(ReadAuthorDTO, author));
    }

    async getById(id: number): Promise<ReadAuthorDTO>{
        if (!id){
            throw new BadRequestException('Se necesita el ID del autor');
        } 
        const author = await this._authorRepository.findOne(id);
        if (!author){
            throw new NotFoundException('El autor no existe');
        }
        return plainToClass(ReadAuthorDTO, author);
    } 
    
    async getAuthorByBook(id_book: number): Promise<ReadAuthorDTO[]>{
        if (!id_book){
            throw new BadRequestException('Es necesario el ID del libro');
        } 
        const authors: Author[] = await this._authorRepository.find({
            where: {status: 'ACTIVE', books: In([id_book])}, 
        });
        return authors.map(author => plainToClass(ReadAuthorDTO, author));
    }
    
    async create(author: Partial<CreateAuthorDTO>): Promise<ReadAuthorDTO>{
        const savedAuthor: Author = await this._authorRepository.save({
            name: author.name, 
            surname: author.surname
        }); 
        return plainToClass(ReadAuthorDTO, savedAuthor);
    }
    
    async update(
        id: number, author: Partial<UpdateAuthorDTO>
    ): Promise<ReadAuthorDTO>{
        const authorExists = await this._authorRepository.findOne(id, {
            where: {status: 'ACTIVE'},
        });
        if (!authorExists){
            throw new NotFoundException('Autor no encontrado');
        }
        const updatedAuthor = await this._authorRepository.update(id, author);
    
        return plainToClass(ReadAuthorDTO, updatedAuthor);
    }
    
    async delete(id: number): Promise<void>{
        const authorExists = await this._authorRepository.findOne(id, {
            where: {status: 'ACTIVE'},
        });
        if (!authorExists){
            throw new NotFoundException('Ese autor no existe');
        }
        await this._authorRepository.update(id, {status: 'UNACTIVE'});
    }        
}
