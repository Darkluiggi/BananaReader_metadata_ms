import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateBookDTO, ReadBookDTO, UpdateBookDTO } from '../dtos';
import { AddDTO } from '../dtos/add.dto';
import { BookService } from '../services/book.service';

@Controller('book')
export class BookController {
    constructor(private readonly _bookService: BookService){}

    @Get()
    getAll(): Promise<ReadBookDTO[]>{
        return this._bookService.getAll();
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe) id: number): Promise<ReadBookDTO>{
        return this._bookService.getById(id);
    }

    @Post('/create')
    createBook(@Body() book: Partial<CreateBookDTO>): Promise<ReadBookDTO>{
        return this._bookService.create(book);
    }

    @Put('/update/:id')
    updateBook(@Param('id', ParseIntPipe) id: number, 
        @Body() book: Partial<UpdateBookDTO>){
        return this._bookService.update(id, book);
    }

    @Delete('/delete/:id')
    deleteAuthor(@Param('id', ParseIntPipe) id: number){
        return this._bookService.delete(id);
    }
}
