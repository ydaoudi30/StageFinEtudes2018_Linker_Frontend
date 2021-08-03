import { DropDown } from "./dropDown";


export class LabelDropDown {
    label: string;
    listdropdown: DropDown[];

    constructor(label: string ,  listdropdown: DropDown[]) {
        this.label = label;
        this.listdropdown = listdropdown;
      }
}