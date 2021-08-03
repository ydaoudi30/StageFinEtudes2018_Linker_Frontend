import { DetailElement } from "./detailElement";
import { Discussion } from "./discussion";

export class QuotationDetail {
    reference:string;
    customer:string;
    commercial:string;
    status:string;
    delay:number;
    type:string;
    TTTC:number;
    THT:number;
    discussion : Discussion;
    quoteElementList:DetailElement[];
    quotationChecked:boolean;
  }
