import { FilterRange } from "./filterrange";
import { FilterDropDown } from "./filterdropdown";

export class ProductFilters {
    rangevalues: FilterRange[];
    dropdownvalues: FilterDropDown[];

    constructor(rangevalues: FilterRange[] ,  dropdownvalues: FilterDropDown[]) {
        this.rangevalues = rangevalues;
        this.dropdownvalues = dropdownvalues;
      }
}