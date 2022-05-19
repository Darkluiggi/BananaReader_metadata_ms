import { IsString } from "class-validator";

export class UpdateGenreDTO{
  @IsString()
  readonly name: string;

}