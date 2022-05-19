import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateGenreDTO, ReadGenreDTO, UpdateGenreDTO } from '../dtos';
import { GenreService } from '../services/genre.service';

@Controller('genre')
export class GenreController {
    constructor(private readonly _genreService: GenreService){}

    @Get()
    getAll(): Promise<ReadGenreDTO[]>{
        return this._genreService.getAll();
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe) id: number): Promise<ReadGenreDTO>{
        return this._genreService.getById(id);
    }

    @Post('/create')
    createAuthor(@Body() genre: Partial<CreateGenreDTO>): Promise<ReadGenreDTO>{
        return this._genreService.create(genre);
    }

    @Put('/update/:id')
    updateAuthor(@Param('id', ParseIntPipe) id: number, 
        @Body() genre: Partial<UpdateGenreDTO>){
        return this._genreService.update(id, genre);
    }

    @Delete('/delete/:id')
    deleteAuthor(@Param('id', ParseIntPipe) id: number){
        return this._genreService.delete(id);
    }
}
