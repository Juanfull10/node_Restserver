


export class UpdateTodoDto{
    constructor(
        public readonly id:number,
        public readonly text:string,
        public readonly createAt?:Date,
    ){}

    get values(){
        const returnObj:{[key:string]:any}={}

        if(this.text) returnObj.text=this.text;

        if(this.createAt) returnObj.createAt=this.createAt;

        return returnObj;
    }

    static create(props:{[key:string]:any}):[string | undefined, UpdateTodoDto | undefined]{

        const {id,text,createAt}= props;
        let newCreateAt= createAt;

        if(!id||isNaN(Number(id)))return ['id must be a valid number',undefined];

        if(createAt){
            newCreateAt= new Date(createAt)
            if(newCreateAt.toString()==='Invalid Date'){
                return ['CreateAt must be a valid date',undefined]
            }
        }



        return [undefined, new UpdateTodoDto(id,text,newCreateAt)];
        
    }
}