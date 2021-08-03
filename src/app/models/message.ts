export class Message{
    message:string;
    senderEmail:string;
    senderFullName:string;
    date: string;

    constructor(message:string,senderEmail:string,senderFullName:string){
        this.message = message;
        this.senderEmail = senderEmail;
        this.senderFullName = senderFullName;
        this.date = '';

    }
}