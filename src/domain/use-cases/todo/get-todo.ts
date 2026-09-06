import { CreateTodoDto, UpdateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface getTodoUseCase{
    execute(id:number):Promise<TodoEntity>
}

export class getTodo implements getTodoUseCase{
    constructor(private readonly repository:TodoRepository){}

    execute(id:number ): Promise<TodoEntity> {
        
        return this.repository.findById(id);
        
    }
    
}