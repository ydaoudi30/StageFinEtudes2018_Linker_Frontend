export class SelectedProduct{
    brand:string;
    model:string;
    guestOrCustomerEmail:string;
    commercialEmail : string[];

    constructor(brand:string, model:string, commercialEmail:string[], guestOrCustomerEmail?:string){
        this.brand = brand;
        this.model = model;
        this.guestOrCustomerEmail = guestOrCustomerEmail;
        this.commercialEmail = commercialEmail;
    }
    
}