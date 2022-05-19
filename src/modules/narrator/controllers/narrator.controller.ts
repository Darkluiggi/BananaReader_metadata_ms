import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateNarratorDTO, ReadNarratorDTO, UpdateNarratorDTO } from '../dtos';
import { NarratorService } from '../services/narrator.service';

@Controller('narrator')
export class NarratorController {
    constructor(private readonly _narratorService: NarratorService){}

    @Get()
    getAll(): Promise<ReadNarratorDTO[]>{
        return this._narratorService.getAll();
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe) id: number): Promise<ReadNarratorDTO>{
        return this._narratorService.getById(id);
    }

    @Post('/create')
    createNarrator(@Body() narrator: Partial<CreateNarratorDTO>): Promise<ReadNarratorDTO>{
        return this._narratorService.create(narrator);
    }

    @Put('/update/:id')
    updateNarrator(@Param('id', ParseIntPipe) id: number, 
        @Body() narrator: Partial<UpdateNarratorDTO>){
        return this._narratorService.update(id, narrator);
    }

    @Delete('/delete/:id')
    deleteNarrator(@Param('id', ParseIntPipe) id: number){
        return this._narratorService.delete(id);
    }
}
