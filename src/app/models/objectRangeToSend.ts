import { FilterRange } from "./filterrange";

export class ObjectRangeToSend {
    keyword: string;
    rangefilter: FilterRange;

    constructor(keyword: string,rangefilter: FilterRange) {
        this.keyword = keyword;
        this.rangefilter = rangefilter;
      }
}