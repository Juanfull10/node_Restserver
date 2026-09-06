import { Router } from "express";
import { TodosController } from "./controller";
import { TodoDataSourceImpl } from "../../infrastructure/datasource/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../infrastructure/repositories/todo.respository.impl";


export class TodoRoutes{

    static get route():Router{

        const router=Router();

        const datasouce= new TodoDataSourceImpl();
        const todoRepository= new TodoRepositoryImpl(datasouce);
        const todosController= new TodosController(todoRepository);
        
        router.get('/',(req,res)=>todosController.getTodos(req,res));
        
        router.get('/:id',(req,res)=>todosController.getTodoById(req,res));

        router.post('/',(req,res)=>todosController.createTodo(req,res));

         router.put('/:id',(req,res)=>todosController.updateTodo(req,res));

          router.delete('/:id',(req,res)=>todosController.deletodo(req,res));
        return router;

    }

}