export class WSMessage {
    constructor(message:String,name:String,euro:number){
        this.Euro = euro;
        this.Name = name;
        this.Message = message;
    }
    Message : String;
    Name : String;
    Euro : number;
}

export class Donator {
    name : String;
    amount : number;
}
