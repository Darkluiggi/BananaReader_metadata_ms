import { Exclude, Expose, Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";
import { ReadAuthorDTO } from "src/modules/author/dtos/read.author.dto";
import { ReadBookDTO } from "src/modules/book/dtos/read.book.dto";

@Exclude()
export class ReadGenreDTO{
  @Expose()
  @IsNumber()
  readonly id_genre: number;

  @Expose()
  @IsString()
  readonly name: string;

  @Expose()
  @Type(Type => ReadAuthorDTO)
  readonly books: ReadBookDTO[];
}