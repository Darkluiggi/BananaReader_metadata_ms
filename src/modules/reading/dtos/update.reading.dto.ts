import { IsArray, IsNumber, IsString } from "class-validator";

export class UpdateReadingDTO{
    @IsNumber()
    readonly user: number;

    @IsNumber()
    readonly storage: number;

    @IsString()
    readonly duration: string;

    @IsNumber()
    readonly chapters: number;

    /*@IsNumber()
    readonly language: number;

    @IsArray()
    readonly narrators: number[];

    @IsNumber()
    readonly book: number;*/
}