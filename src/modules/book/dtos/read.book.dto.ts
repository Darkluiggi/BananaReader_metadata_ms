import { Exclude, Expose, Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";
import { ReadAuthorDTO } from "src/modules/author/dtos/read.author.dto";
import { ReadGenreDTO } from "src/modules/genre/dtos/read.genre.dto";

@Exclude()
export class ReadBookDTO{
  @Expose()
  @IsNumber()
  readonly id_book: number;

  @Expose()
  @IsString()
  readonly title: string;

  @Expose()
  @IsString()
  readonly sinopsis: string;

  @Expose()
  @IsNumber()
  readonly year: number;

  @Expose()
  @IsString()
  readonly duration: string;

  @Expose()
  @IsNumber()
  readonly user: number;

  @Expose()
  @IsNumber()
  readonly storage: number;

  @Expose()
  @Type(Type => ReadAuthorDTO)
  readonly authors: ReadAuthorDTO[];

  @Expose()
  @Type(Type => ReadGenreDTO)
  readonly genres: ReadGenreDTO[];
}