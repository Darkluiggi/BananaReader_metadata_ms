import { IsArray, IsNumber, IsString } from "class-validator";

export class UpdateBookDTO{
  @IsString()
  readonly title: string;

  @IsString()
  readonly sinopsis: string;

  @IsNumber()
  readonly year: number;

  @IsString()
  readonly duration: string;


  @IsNumber()
  readonly user: number;

  @IsNumber()
  readonly storage: number;
}