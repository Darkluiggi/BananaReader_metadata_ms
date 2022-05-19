import { IsNotEmpty, IsString } from "class-validator";

export class CreateLanguageDTO{
    @IsNotEmpty()
    @IsString()
    readonly name: string;
}