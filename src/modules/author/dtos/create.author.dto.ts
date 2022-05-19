import { IsNotEmpty, IsString } from "class-validator";
import { Book } from "src/modules/book/entities/book.entity";

export class CreateAuthorDTO{
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly surname: string;

    @IsNotEmpty()
    readonly books: Book[];
}