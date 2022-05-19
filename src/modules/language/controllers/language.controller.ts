import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateLanguageDTO, ReadLanguageDTO, UpdateLanguageDTO } from '../dtos';
import { LanguageService } from '../services/language.service';

@Controller('language')
export class LanguageController {
    constructor(private readonly _languageService: LanguageService){}

    @Get()
    getAll(): Promise<ReadLanguageDTO[]>{
        return this._languageService.getAll();
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe) id: number): Promise<ReadLanguageDTO>{
        return this._languageService.getById(id);
    }

    @Post('/create')
    createLanguage(@Body() language: Partial<CreateLanguageDTO>): Promise<ReadLanguageDTO>{
        return this._languageService.create(language);
    }

    @Put('/update/:id')
    updateLanguage(@Param('id', ParseIntPipe) id: number, 
        @Body() language: Partial<UpdateLanguageDTO>){
        return this._languageService.update(id, language);
    }

    @Delete('/delete/:id')
    deleteLanguage(@Param('id', ParseIntPipe) id: number){
        return this._languageService.delete(id);
    }
}
