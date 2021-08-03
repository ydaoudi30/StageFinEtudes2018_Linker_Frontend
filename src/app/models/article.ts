export class Article {

    private description: string;
    private label: string;
    private price: number;
    private quantity: number;

    constructor( description, label, price, quantity ) {
        this.description = description;
        this.label = label;
        this.price = price;
        this.quantity = quantity;
    }
}
