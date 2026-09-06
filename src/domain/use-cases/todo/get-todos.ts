import { CreateTodoDto, UpdateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface getTodosUseCase{
    execute():Promise<TodoEntity[]>
}

export class getTodos implements getTodosUseCase{
    constructor(private readonly repository:TodoRepository){}

    execute( ): Promise<TodoEntity[]> {
        
        return this.repository.getAll();
        
    }
    
}