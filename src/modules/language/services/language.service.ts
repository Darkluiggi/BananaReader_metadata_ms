import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { CreateLanguageDTO, ReadLanguageDTO, UpdateLanguageDTO } from '../dtos';
import { Language } from '../entities/language.entity';
import { LanguageRepository } from '../language.repository';

@Injectable()
export class LanguageService {
    constructor (
        @InjectRepository(LanguageRepository)
        private readonly _languageRepository: LanguageRepository,
    ){}
    
    async getAll(): Promise<ReadLanguageDTO[]>{ 
        const languages = await this._languageRepository.find();
        if (!languages){
            throw new NotFoundException('No hay lenguajes');
        }
        return languages.map(language => plainToClass(ReadLanguageDTO, language));
    }
    
    async getById(id: number): Promise<ReadLanguageDTO>{
        if (!id){
            throw new BadRequestException('Se necesita el ID del lenguaje');
        } 
        const language = await this._languageRepository.findOne(id);
        if (!language){
            throw new NotFoundException('El liblenguagesexiste');
        }
        return plainToClass(ReadLanguageDTO,language);
    }

    async create(language: Partial<CreateLanguageDTO>): Promise<ReadLanguageDTO>{
        const savedLanguage: Language = await this._languageRepository.save({
            name: language.name
        }); 
        return plainToClass(ReadLanguageDTO, savedLanguage);
    }

    async update(
        id: number, language: Partial<UpdateLanguageDTO>
    ): Promise<ReadLanguageDTO>{
        const languageExists = await this._languageRepository.findOne(id, {
            where: {status: 'ACTIVE'},
        });
        if (!languageExists){
            throw new NotFoundException('Lenguaje no encontrado');
        }
        const updatedLanguage = await this._languageRepository.update(id, language);
    
        return plainToClass(ReadLanguageDTO, updatedLanguage);
    }
    
    
    async delete(id: number): Promise<void>{
        const languageExists = await this._languageRepository.findOne(id, {
            where: {status: 'ACTIVE'},
        });
        if (!languageExists){
            throw new NotFoundException('Ese lenguaje no existe');
        }
        await this._languageRepository.update(id, {status: 'UNACTIVE'});
    }
}