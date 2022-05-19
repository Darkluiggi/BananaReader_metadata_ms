import { IsString } from "class-validator";

export class UpdateAuthorDTO{
  @IsString()
  readonly name: string;

  @IsString()
  readonly surname: string;
}