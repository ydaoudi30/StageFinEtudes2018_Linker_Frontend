import { Component, OnInit } from '@angular/core';
import { SearchProductsService } from '../../services/search-products.service';
import { ProductCard } from '../../models/productcard';
import { Product } from '../../models/product';

@Component({
    selector: 'app-home-nouveauprod',
    templateUrl: './home-nouveauprod.component.html',
    styleUrls: ['./home-nouveauprod.component.css']
})
export class HomeNouveauprodComponent implements OnInit {

    allProducts: ProductCard[];
    newProducts: ProductCard[];
    loading: boolean;

    constructor(private searchService: SearchProductsService) {

    }

    ngOnInit() {

        this.searchService.newProducts().subscribe(
            (prod2: ProductCard[]) => {
                this.newProducts = prod2;
                this.loading = false;


            },
            err => console.log(err),
            () => console.log(this.newProducts));
    }
}