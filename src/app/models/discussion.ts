import { Message } from "./message";

export class Discussion {
  refQuote: String;
  commercialEmail: string;
  commercialFullName: string;
  customerEmail: string;
  customerFullName: string;
  messages: Message[];

  constructor(refQuote: String, commercialEmail: string, commercialFullName: string, customerEmail: string, customerFullName: string, messages: Message[]) {
    this.refQuote = refQuote;
    this.commercialEmail = commercialEmail;
    this.commercialFullName = commercialFullName;
    this.customerEmail = customerEmail;
    this.customerFullName = customerFullName;
    this.messages = messages;
  }

  
}