import { IsString } from "class-validator";

export class UpdateNarratorDTO{
    @IsString()
    readonly name: string;
  
    @IsString()
    readonly surname: string;
  }