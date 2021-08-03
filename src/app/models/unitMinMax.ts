
export class UnitMinMax {
    unit: string;
    minMax: number[];
    min: number;
    max: number;

    constructor(unit: string ,  minMax: number[], min: number , max: number) {
        this.unit = unit;
        this.minMax = minMax;
        this.min = min;
        this.max= max;
      }
}