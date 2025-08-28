import { Inject, Injectable } from '@nestjs/common';
export interface TodoList  { 
    name: string 
    priority: string
    status: string

}
@Injectable()
export class TodoListService {
constructor(@Inject('POSTGRES_POOL') private readonly sql:any) {}
async getAllTodList(): Promise<string[]> {
    return await this.sql`SELECT * FROM todo_list`;
}

async createTodoList(data : TodoList): Promise<string[]> {
    return await this.sql`INSERT INTO todo_list (name, priority , status) VALUES (${data.name}, ${data.priority} , ${data.status})RETURNING *`;

}

async deleteTodoList(id : number): Promise<string[]> {
    return await this.sql`DELETE FROM todo_list WHERE id = ${id} RETURNING *`;
}

async updateTodList(id : number , data : TodoList): Promise<string[]> {
    return await this.sql`UPDATE todo_list SET name = ${data.name}, priority = ${data.priority}, status = ${data.status} WHERE id = ${id} RETURNING *`;
}
}
