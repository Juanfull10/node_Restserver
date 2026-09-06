

export class TodoEntity{
    
    
    constructor(private id:number,private text:string,private createdAt?:Date|null){}

    get isCOmpleted(){
        return !!this.createdAt;
    }


    

    public static fromObject(object:{[key:string]:any}):TodoEntity{


        const {id, text,createAt}= object;

        if(!id) throw 'Id is required';

        if(!text) throw ' text id required';

        let newCreateAt;

        if(createAt){
             newCreateAt= new Date(createAt);
            if(isNaN(newCreateAt.getDate())){
                throw 'CreatedAt is not a valid date'
            }
        }

        return new TodoEntity(
            id,text,createAt
        ) 

    }

}