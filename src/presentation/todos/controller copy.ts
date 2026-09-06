import { Request, Response } from "express"
import { prisma } from "../../data/postgres";
import { CreateTodoDto, TodoRepository, UpdateTodoDto } from "../../domain";



 const todos= [
                {id:1,text:'Buy milk',createAt:new Date()},
                {id:2,text:'Buy Breads',createAt:new Date()},
                {id:3,text:'Buy Eggs',createAt:new Date()},
                {id:4,text:'Buy Butter',createAt:null}
            ];  




export class TodosController{


    //*DI
    constructor(private readonly todoRepository:TodoRepository){}

    public getTodos= async(req:Request,res:Response)=>{
         
        //const todo= await prisma.todo.findMany({});
        //return res.json(todo);
        const todos= await this.todoRepository.getAll();

        return res.json(todos);

    }

    public getTodoById= async(req:Request,res:Response)=>{

    

        const id= +(req.params.id ?? '');

        try {
            const todo= await this.todoRepository.findById(id);
            return res.json(todo);
        } catch (error) {
            res.status(400).json({error});
        }

    }

    public createTodo= async (req:Request,res:Response) => {


        const [error,createTodoDto]= CreateTodoDto.create(req.body);
        if(error) return res.status(400).json({error});


        const todo= await this.todoRepository.create(createTodoDto!);

        return res.json(todo);

            /*
            const todo= prisma.todo.create({
                data:{text},
            })
           
            const newTodo={
                id:todos.length+1,
                text:text,
                createAt:null
            }
            todos.push(newTodo);
            res.json(todo);
           */ 
    }


    public updateTodo=async(req:Request,res:Response)=>{

        const id= +(req.params.id ?? '');
        const [error,updateTodoDto]= UpdateTodoDto.create({...req.body,id})
        
        if(error)return res.status(400).json({error:`Todo with id ${id} not found`});

       
        try {
            const updateTodo= await this.todoRepository.updateById(updateTodoDto!);

            return res.json(updateTodo);
        } catch (error) {

            res.status(400).json({error});
        }
            /*const {text,createAt}=req.body;
             const data: { text?: string; createAt?: Date | null } = {};
   
             if (text) data.text = text;
                if (createAt === 'null') {
                    data.createAt = null;
                } else if (createAt) {
                    data.createAt = new Date(createAt);
                }

            try {
                const updateTodo=await prisma.todo.update({
                    where:{id},
                    data:{
                        text,
                        createAt:(createAt)?new Date(createAt):null
                    }
                });

                  return res.json(updateTodo);
            } catch (error) {
                return res.status(404).json({ error: `TODO with id ${id} not found` });
            }

        
            const todo= todos.find(todo=>todo.id===id);
            if(!todo) {
                return res.status(404).json({ error: `TODO with id ${id} not found` });
            }

           const {text,createAt}=req.body;
           
           todo.text=text||todo.text;
           (createAt==='null')
            ? todo.createAt=null
            : todo.createAt=new Date(createAt||todo.createAt);

               

           return res.json(todo); */    

        }


        public deletodo=async(req:Request,res:Response)=>{
            
            const id= +(req.params.id ?? '');
         
            if(isNaN(id)){ return res.status(400).json({error:`Id number is not a number`})}
            
           

          
            try {
                const deletedTodo= await this.todoRepository.deleteById(id);

                return res.json(deletedTodo)
            } catch (error) {
                 return res.status(404).json({ error: `TODO with id ${id} not found` });
            }


           
            /*
            const todo= todos.find(todo=>todo.id===id);
            if(!todo) {
                return res.status(404).json({ error: `TODO with id ${id} not found` });
            }

            const delettodo=todos.filter(todo=>id!==todo.id)

            todos.splice(todos.indexOf(todo),1);
            return res.json(todo)*/

        }
}