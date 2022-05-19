import { IsNotEmpty, IsString } from "class-validator";
import { Book } from "src/modules/book/entities/book.entity";

export class CreateGenreDTO{
    @IsNotEmpty()
    @IsString()
    readonly name: string;
}