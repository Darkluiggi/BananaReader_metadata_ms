import { IsNotEmpty, IsString } from "class-validator";

export class CreateNarratorDTO{
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly surname: string;
}