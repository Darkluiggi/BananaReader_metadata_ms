import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateReadingDTO, ReadReadingDTO, UpdateReadingDTO } from '../dtos';
import { ReadingService } from '../services/reading.service';

@Controller('reading')
export class ReadingController {
    constructor(private readonly _readingService: ReadingService){}

    @Get()
    getAll(): Promise<ReadReadingDTO[]>{
        return this._readingService.getAll();
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe) id: number): Promise<ReadReadingDTO>{
        return this._readingService.getById(id);
    }

    @Post('/create')
    createReading(@Body() reading: Partial<CreateReadingDTO>): Promise<ReadReadingDTO>{
        return this._readingService.create(reading);
    }

    @Put('/update/:id')
    updateReading(@Param('id', ParseIntPipe) id: number, 
        @Body() reading: Partial<UpdateReadingDTO>){
        return this._readingService.update(id, reading);
    }

    @Delete('/delete/:id')
    deleteReading(@Param('id', ParseIntPipe) id: number){
        return this._readingService.delete(id);
    }
}
