import { IsString } from "class-validator";

export class UpdateLanguageDTO{
    @IsString()
    readonly name: string;
}