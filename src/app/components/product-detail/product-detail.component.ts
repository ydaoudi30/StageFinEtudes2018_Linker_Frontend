import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CartService } from '../../services/cart.service';
import { User } from '../../models/user';
import { SelectedProduct } from '../../models/selectedProduct';
import { LoginService } from '../../services/login.service';

import { MessageService } from 'primeng/components/common/messageservice';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as cartReducer from '../../redux/reducers/cart.reducer';
import * as fromActions from '../../redux/actions/cart.action';
import { CartState } from '../../redux/states/cart.state';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { SearchProductsService } from '../../services/search-products.service';
import { ProductCart } from '../../models/productCart';
import { ProductWithCommercials } from '../../models/product-commercials';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class ProductDetailComponent implements OnInit {

    brand: string;
    model: string;

    product: ProductWithCommercials;
    galleryImages: any[] = [];

    loading: boolean;
    numArticleBefore: number;
    numArticleAfter: number;

    width: number;
    addCommercialWidth: any;

    availableCommercials: any[] = [];
    selectedCommercials: any[];

    constructor(private cartService: CartService,
        private loginService: LoginService,
        private store: Store<CartState>,
        private messageService: MessageService,
        private route: ActivatedRoute,
        private router: Router,
        private productSearchService: SearchProductsService) {

    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.model = params.get('model');
            this.brand = params.get('brand');

            this.productSearchService.getProductByBrandAndModel(this.model, this.brand).subscribe(
                (product: ProductWithCommercials) => {
                    this.product = product;
                    product.commercials.forEach(commercial => {
                        this.availableCommercials.push(
                            {value: commercial}
                        );
                    });
                    product.images.forEach(image => {
                        this.galleryImages.push(
                            {
                                source: image,
                                alt: '',
                                title: product.label
                            }
                        );
                    });

                    console.log(product);
                }
            );

        });
    }

    addProductToCommercialCart() {
        console.log(this.selectedCommercials);

        let commercialEmails = [];
        this.selectedCommercials.forEach(commercial => {
            commercialEmails.push(commercial.email);
        });

        let selectedProduct = new SelectedProduct(this.brand, this.model, commercialEmails);

        let cartObservable = this.cartService.cart(selectedProduct);
        if (cartObservable) {
            cartObservable.subscribe(
                (articleNumber: number) => {
                    this.store.dispatch(new fromActions.AddToCartArticleAction(articleNumber));
                    this.numArticleAfter = articleNumber;
                    this.loading = false;
                },
                err => console.log(err),
                () => console.log('Request Complete'));
            this.messageService.add({ severity: 'success', summary: 'Ajout', detail: "L'article à bien été ajouté au panier" });
        }
        else {
            this.store.dispatch(new fromActions.AddToCartArticleAction(0));
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.width = event.target.innerWidth * 0.397;
        this.addCommercialWidth = {width: event.target.innerWidth * 0.37 + 'px'};
    }

    ngAfterViewInit() {
        this.width = window.innerWidth * 0.397;
        this.addCommercialWidth = {width: window.innerWidth * 0.37 + 'px'};
    }

}
