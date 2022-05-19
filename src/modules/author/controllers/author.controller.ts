import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateAuthorDTO, ReadAuthorDTO, UpdateAuthorDTO } from '../dtos';
import { AuthorService } from '../services/author.service';

@Controller('author')
export class AuthorController {
    constructor(private readonly _authorService: AuthorService){}

    @Get()
    getAll(): Promise<ReadAuthorDTO[]>{
        return this._authorService.getAll();
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe) id: number): Promise<ReadAuthorDTO>{
        return this._authorService.getById(id);
    }

    @Post('/create')
    createAuthor(@Body() author: Partial<CreateAuthorDTO>): Promise<ReadAuthorDTO>{
        return this._authorService.create(author);
    }

    @Put('/update/:id')
    updateAuthor(@Param('id', ParseIntPipe) id: number, 
        @Body() author: Partial<UpdateAuthorDTO>){
        return this._authorService.update(id, author);
    }

    @Delete('/delete/:id')
    deleteAuthor(@Param('id', ParseIntPipe) id: number){
        return this._authorService.delete(id);
    }
}
