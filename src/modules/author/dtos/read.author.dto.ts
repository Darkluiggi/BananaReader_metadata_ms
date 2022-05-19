import { Exclude, Expose, Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";
import { ReadBookDTO } from "src/modules/book/dtos/read.book.dto";

@Exclude()
export class ReadAuthorDTO{
  @Expose()
  @IsNumber()
  readonly id_author: number;

  @Expose()
  @IsString()
  readonly name: string;

  @Expose()
  @IsString()
  readonly surname: string;

  @Expose()
  @Type(Type => ReadAuthorDTO)
  readonly books: ReadBookDTO[];
}