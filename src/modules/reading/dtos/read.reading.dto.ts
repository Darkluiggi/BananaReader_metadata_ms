import { Exclude, Expose, Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";
import { ReadLanguageDTO } from "src/modules/language/dtos/read.language.dto";
import { ReadNarratorDTO } from "src/modules/narrator/dtos/read.narrator.dto";

@Exclude()
export class ReadReadingDTO{
  @Expose()
  @IsNumber()
  readonly id_reading: number;

  @Expose()
  @IsNumber()
  readonly user: number;

  @Expose()
  @IsNumber()
  readonly storage: number;

  @Expose()
  @IsString()
  readonly duration: string;

  @Expose()
  @IsNumber()
  readonly chapters: number;

  @Expose()
  @Type(Type => ReadLanguageDTO)
  readonly language: ReadLanguageDTO;

  @Expose()
  @Type(Type => ReadNarratorDTO)
  readonly narrators: ReadNarratorDTO[];
}