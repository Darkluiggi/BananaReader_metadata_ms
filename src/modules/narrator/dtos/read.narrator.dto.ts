import { Exclude, Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

@Exclude()
export class ReadNarratorDTO{
  @Expose()
  @IsNumber()
  readonly id_narrator: number;

  @Expose()
  @IsString()
  readonly name: string;

  @Expose()
  @IsString()
  readonly surname: string;
}