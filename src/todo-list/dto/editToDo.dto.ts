import { IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class UpdateCreateToDoDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    priority: string;
    @IsString()
    @IsNotEmpty()
    status: string;
}