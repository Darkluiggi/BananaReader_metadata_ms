import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Author } from "src/modules/author/entities/author.entity";
import { Genre } from "src/modules/genre/entities/genre.entity";

export class CreateBookDTO{
    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    readonly sinopsis: string;

    @IsNotEmpty()
    @IsNumber()
    readonly year: number;

    @IsNotEmpty()
    readonly authorIds: number[];

    @IsNotEmpty()
    readonly genreIds: number[];
}