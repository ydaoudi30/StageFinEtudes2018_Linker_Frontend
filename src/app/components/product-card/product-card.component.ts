import { Component, OnInit, Input } from '@angular/core';
import { ProductCard } from '../../models/productcard';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

    @Input()
    product: ProductCard;

    constructor() {

    }

    ngOnInit() {
        console.log(this.product);
    }

}
