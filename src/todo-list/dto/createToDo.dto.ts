import {IsString , IsNotEmpty} from 'class-validator';


export class CreateToDoDTO {
    @IsString()
    @IsNotEmpty()
   readonly name: string

    @IsString()
    @IsNotEmpty()
  readonly  priority: string

    @IsString()
    @IsNotEmpty()
   readonly status: string
}