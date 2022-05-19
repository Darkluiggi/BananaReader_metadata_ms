import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { BookRepository } from 'src/modules/book/book.repository';
import { LanguageRepository } from 'src/modules/language/language.repository';
import { NarratorRepository } from 'src/modules/narrator/narrator.repository';
import { CreateReadingDTO, ReadReadingDTO, UpdateReadingDTO } from '../dtos';
import { Reading } from '../entities/reading.entity';
import { ReadingRepository } from '../reading.repository';

@Injectable()
export class ReadingService {
    constructor (
        @InjectRepository(ReadingRepository)
        private readonly _readingRepository: ReadingRepository,
        @InjectRepository(BookRepository)
        private readonly _bookRepository: BookRepository,
        @InjectRepository(NarratorRepository)
        private readonly _narratorRepository: NarratorRepository,
        @InjectRepository(LanguageRepository)
        private readonly _languageRepository: LanguageRepository
    ){}
    
    async getAll(): Promise<ReadReadingDTO[]>{ 
        const readings = await this._readingRepository.find();
        if (!readings){
            throw new NotFoundException('No hay lecturas');
        }
        return readings.map(reading => plainToClass(ReadReadingDTO, reading));
    }
    
    async getById(id: number): Promise<ReadReadingDTO>{
        if (!id){
            throw new BadRequestException('Se necesita el ID del libro');
        } 
        const reading = await this._readingRepository.findOne(id);
        if (!reading){
            throw new NotFoundException('La lectura no existe');
        }
        return plainToClass(ReadReadingDTO, reading);
    }
    
    async create(reading: Partial<CreateReadingDTO>): Promise<ReadReadingDTO>{
        const narrators = await this._narratorRepository.findByIds(reading.narrators);
        const language = await this._languageRepository.findOne(reading.language);
        const book = await this._bookRepository.findOne(reading.book);
        const savedReading: Reading = await this._readingRepository.save({
            user: reading.user,
            storage: reading.storage,
            duration: reading.duration,
            chapters: reading.chapters,
            language: language,
            narrators: narrators,
            book: book 
        }); 
        return plainToClass(ReadReadingDTO, savedReading);
    }

    async update(
        id: number, reading: Partial<UpdateReadingDTO>
    ): Promise<ReadReadingDTO>{
        const readingExists = await this._readingRepository.findOne(id, {
            where: {status: 'ACTIVE'},
        });
        if (!readingExists){
            throw new NotFoundException('Narrador no encontrado');
        }
        const updatedReading = await this._readingRepository.update(id, reading);
    
        return plainToClass(ReadReadingDTO, updatedReading);
    }
    
    
    async delete(id: number): Promise<void>{
        const readingExists = await this._readingRepository.findOne(id, {
            where: {status: 'ACTIVE'},
        });
        if (!readingExists){
            throw new NotFoundException('Esa lectura no existe');
        }
        await this._readingRepository.update(id, {status: 'UNACTIVE'});
    }
}
