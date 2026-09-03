import { Request, Response } from "express"
import { error } from "node:console";

 const todos= [
                {id:1,text:'Buy milk',createAt:new Date()},
                {id:2,text:'Buy Breads',createAt:new Date()},
                {id:3,text:'Buy Eggs',createAt:new Date()},
                {id:4,text:'Buy Butter',createAt:null}
            ];  




export class TodosController{


    //*DI
    constructor(){}

    public getTodos= (req:Request,res:Response)=>{
         
           return res.json(todos)
  

        }

      public getTodoById= (req:Request,res:Response)=>{

           const id= +(req.params.id ?? '');
           const todo= todos.find(todo=>todo.id===id);
            if(isNaN(id)){ return res.status(400).json({error:`Id number is not a number`})}

           (todo)
           ? res.json(todo)
           : res.status(404).json({error:`TODO with id ${id} not found`})


        }

        public createTodo(req:Request,res:Response){
            const {text}=req.body;
            if(!text) return res.status(400).json({error:'texto property is required'});

            const newTodo={
                id:todos.length+1,
                text:text,
                createAt:null
            }
            todos.push(newTodo);
            res.json(newTodo);
        }


        public updateTodo=(req:Request,res:Response)=>{

           const id= +(req.params.id ?? '');
         
            if(isNaN(id)){ return res.status(400).json({error:`Id number is not a number`})}
            
            const todo= todos.find(todo=>todo.id===id);
            if(!todo) {
                return res.status(404).json({ error: `TODO with id ${id} not found` });
            }

           const {text,createAt}=req.body;
           
           todo.text=text||todo.text;
           (createAt==='null')
            ? todo.createAt=null
            : todo.createAt=new Date(createAt||todo.createAt);



           return res.json(todo);

        }


        public deletodo=(req:Request,res:Response)=>{
            
             const id= +(req.params.id ?? '');
         
            if(isNaN(id)){ return res.status(400).json({error:`Id number is not a number`})}
            
            const todo= todos.find(todo=>todo.id===id);
            if(!todo) {
                return res.status(404).json({ error: `TODO with id ${id} not found` });
            }

            const delettodo=todos.filter(todo=>id!==todo.id)

            todos.splice(todos.indexOf(todo),1);
            return res.json(todo)

        }
}