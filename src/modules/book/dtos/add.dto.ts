import { IsArray, IsNotEmpty, IsNumber } from "class-validator";

export class AddDTO{

    @IsArray()
    readonly authorIds: number[];

    @IsArray()
    readonly genreIds: number[];
}