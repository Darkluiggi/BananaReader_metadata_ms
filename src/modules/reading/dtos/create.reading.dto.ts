import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateReadingDTO{
    @IsNotEmpty()
    @IsNumber()
    readonly user: number;

    @IsNotEmpty()
    @IsNumber()
    readonly storage: number;

    @IsNotEmpty()
    @IsString()
    readonly duration: string;

    @IsNotEmpty()
    @IsNumber()
    readonly chapters: number;

    @IsNotEmpty()
    @IsNumber()
    readonly language: number;

    @IsNotEmpty()
    readonly narrators: number[];

    @IsNotEmpty()
    @IsNumber()
    readonly book: number;
}