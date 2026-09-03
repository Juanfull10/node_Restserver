import { Router } from "express";
import { TodosController } from "./controller";


export class TodoRoutes{

    static get route():Router{

        const router=Router();
        const todosController= new TodosController();
        
        router.get('/',(req,res)=>todosController.getTodos(req,res));
        
        router.get('/:id',(req,res)=>todosController.getTodoById(req,res));

        router.post('/',(req,res)=>todosController.createTodo(req,res));

         router.put('/:id',(req,res)=>todosController.updateTodo(req,res));

          router.delete('/:id',(req,res)=>todosController.deletodo(req,res));
        return router;

    }

}