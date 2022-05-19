import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { ReadAuthorDTO } from 'src/modules/author/dtos';
import { In } from 'typeorm';
import { CreateGenreDTO, ReadGenreDTO, UpdateGenreDTO } from '../dtos';
import { Genre } from '../entities/genre.entity';
import { GenreRepository } from '../genre.repository';

@Injectable()
export class GenreService {
    constructor (
        @InjectRepository(GenreRepository)
        private readonly _genreRepository: GenreRepository
    ){}
    
    async getAll(): Promise<ReadGenreDTO[]>{ 
        const genres = await this._genreRepository.find();
        if (!genres){
            throw new NotFoundException('No hay generos');
        }
        return genres.map(genre => plainToClass(ReadGenreDTO, genre));
    }

    async getById(id: number): Promise<ReadGenreDTO>{
        if (!id){
            throw new BadRequestException('Se necesita el ID del genero');
        } 
        const genre = await this._genreRepository.findOne(id);
        if (!genre){
            throw new NotFoundException('El genero no existe');
        }
        return plainToClass(ReadGenreDTO, genre);
    } 
    
    async getGenreByBook(id_book: number): Promise<ReadGenreDTO[]>{
        if (!id_book){
            throw new BadRequestException('Es necesario el ID del libro');
        } 
        const genres: Genre[] = await this._genreRepository.find({
            where: {status: 'ACTIVE', books: In([id_book])}, 
        });
        return genres.map(genre => plainToClass(ReadGenreDTO, genre));
    }
    
    async create(genre: Partial<CreateGenreDTO>): Promise<ReadGenreDTO>{
        const savedGenre: Genre = await this._genreRepository.save({
            name: genre.name
        }); 
        return plainToClass(ReadGenreDTO, savedGenre);
    }
    
    async update(
        id: number, genre: Partial<UpdateGenreDTO>
    ): Promise<ReadGenreDTO>{
        const genreExists = await this._genreRepository.findOne(id, {
            where: {status: 'ACTIVE'},
        });
        if (!genreExists){
            throw new NotFoundException('Genero no encontrado');
        }
        const updatedGenre = await this._genreRepository.update(id, genre);
    
        return plainToClass(ReadGenreDTO, updatedGenre);
    }
    
    async delete(id: number): Promise<void>{
        const genreExists = await this._genreRepository.findOne(id, {
            where: {status: 'ACTIVE'},
        });
        if (!genreExists){
            throw new NotFoundException('Ese genero no existe');
        }
        await this._genreRepository.update(id, {status: 'UNACTIVE'});
    }
}
