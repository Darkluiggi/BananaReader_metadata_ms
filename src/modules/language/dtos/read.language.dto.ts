import { Exclude, Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

@Exclude()
export class ReadLanguageDTO{
  @Expose()
  @IsNumber()
  readonly id_language: number;

  @Expose()
  @IsString()
  readonly name: string;
}