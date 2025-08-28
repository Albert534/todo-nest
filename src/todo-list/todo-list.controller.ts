import { Controller, Get , Post, Req , Body, Delete, Param, Put} from '@nestjs/common';
import { TodoList, TodoListService } from './todo-list.service';
import { CreateToDoDTO } from './dto/createToDo.dto';
import { UpdateCreateToDoDTO } from './dto/editToDo.dto';

@Controller('todo-list')
export class TodoListController {
constructor(private readonly todoService: TodoListService) {}
 @Get()
 async findAll(@Req() request: Request): Promise<string[]> {
    return  await this.todoService.getAllTodList();
 }

 @Post('addTodoList')
 async create(@Body() CreateToDoDTO: CreateToDoDTO) : Promise<string[]> { 

    return await this.todoService.createTodoList(CreateToDoDTO);
    
 }
 @Delete('deleteTodoList/:id')
 async delete(@Param('id') id:number): Promise<string[]> {
    return  await this.todoService.deleteTodoList(id);
 }

 @Put('updateTodoList/:id')
 async update(@Param('id')id: number , @Body() UpdateCreateToDoDTO: UpdateCreateToDoDTO): Promise<string[]> {
     return await this.todoService.updateTodList(id , UpdateCreateToDoDTO);
 }


}
