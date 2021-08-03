export class ResponseDetail{
    unitPriceHT:number;
    discount:number;
    unitPriceDiscounted:number;
    totalUnitPriceDiscounted : number;

    constructor(unitPriceHT:number,discount:number){
        this.unitPriceHT = unitPriceHT;
        this.discount = discount;
        this.unitPriceDiscounted = 0;
        this.totalUnitPriceDiscounted = 0;

    }
}