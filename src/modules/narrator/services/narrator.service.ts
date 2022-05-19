import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { CreateNarratorDTO, ReadNarratorDTO, UpdateNarratorDTO } from '../dtos';
import { Narrator } from '../entities/narrator.entity';
import { NarratorRepository } from '../narrator.repository';

@Injectable()
export class NarratorService {
    constructor (
        @InjectRepository(NarratorRepository)
        private readonly _narratorRepository: NarratorRepository,
    ){}
    
    async getAll(): Promise<ReadNarratorDTO[]>{ 
        const narrators = await this._narratorRepository.find();
        if (!narrators){
            throw new NotFoundException('No hay narradores');
        }
        return narrators.map(narrator => plainToClass(ReadNarratorDTO, narrator));
    }
    
    async getById(id: number): Promise<ReadNarratorDTO>{
        if (!id){
            throw new BadRequestException('Se necesita el ID del libro');
        } 
        const narrator = await this._narratorRepository.findOne(id);
        if (!narrator){
            throw new NotFoundException('El narrador no existe');
        }
        return plainToClass(ReadNarratorDTO, narrator);
    }
    
    async create(narrator: Partial<CreateNarratorDTO>): Promise<ReadNarratorDTO>{
        const savedNarrator: Narrator = await this._narratorRepository.save({
            name: narrator.name,
            surname: narrator.surname
        }); 
        return plainToClass(ReadNarratorDTO, savedNarrator);
    }

    async update(
        id: number, narrator: Partial<UpdateNarratorDTO>
    ): Promise<ReadNarratorDTO>{
        const narratorExists = await this._narratorRepository.findOne(id, {
            where: {status: 'ACTIVE'},
        });
        if (!narratorExists){
            throw new NotFoundException('Narrador no encontrado');
        }
        const updatedNarrator = await this._narratorRepository.update(id, narrator);
    
        return plainToClass(ReadNarratorDTO, updatedNarrator);
    }
    
    
    async delete(id: number): Promise<void>{
        const narratorExists = await this._narratorRepository.findOne(id, {
            where: {status: 'ACTIVE'},
        });
        if (!narratorExists){
            throw new NotFoundException('Ese narrador no existe');
        }
        await this._narratorRepository.update(id, {status: 'UNACTIVE'});
    }
}
