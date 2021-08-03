import { Component, OnInit } from '@angular/core';
import { SearchProductsService } from '../../services/search-products.service';
import { Category } from '../../models/category';
import { Router } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { filter } from 'rxjs/operator/filter';
import { ButtonModule } from 'primeng/button'

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

    constructor(private searchService: SearchProductsService, private router: Router) { }

    ngOnInit() {
    }

    detail(value) {
        console.log(value);
        this.router.navigate(['/product-searchresult', value.keyword]);
        /*this.searchService.getProductsByKeyword(value.keyword).subscribe(
            response => {
                if (response) {
                    this.router.navigate(['/product-searchresult'], { queryParams: filter, skipLocationChange: true });
                }
            },
            err => console.log(err),
            () => console.log('Request Complete'));*/
    }

}
