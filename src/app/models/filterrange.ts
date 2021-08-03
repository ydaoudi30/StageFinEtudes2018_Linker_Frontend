import { MinMax } from "./minmax";

export class FilterRange {
    label: string;
    value: MinMax[];

    constructor(label: string , value:MinMax[]) {
        this.label = label;
        this.value = value;
      }
      
}