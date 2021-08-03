import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { DropDownService } from '../../services/drop-down.service';
import { Cart } from '../../models/cart';
import { CommercialCart } from '../../models/commercialCart';
import { DropDown } from '../../models/dropDown';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as cartReducer from '../../redux/reducers/cart.reducer';
import * as fromActions from '../../redux/actions/cart.action';
import { CartState } from '../../redux/states/cart.state';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { LoginService } from '../../services/login.service';


@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    cart: Cart;
    commercialCart: CommercialCart;
    loading: boolean;
    commercials: DropDown[];
    selectedCommercial: DropDown;
    com: string;
    quoteRef: String;
    dialog: number = 0;
    userType: string = null;


    constructor(private cartService: CartService,
        private dropDownService: DropDownService,
        private messageService: MessageService,
        private store: Store<CartState>,
        private confirmationService: ConfirmationService,
        private route: ActivatedRoute,
        private router: Router,
        public http: Http,
        private loginService: LoginService,
        public authHttp: AuthHttp) { }

    ngOnInit() {

        let cartObservable = this.cartService.getCart();
        let nbProductObservable = this.dropDownService.commercials();
        if (cartObservable && nbProductObservable) {
            cartObservable.subscribe(
                (c: Cart) => {
                    this.cart = c;
                    this.loading = false;
                    console.log(this.cart);
                },
                err => console.log(err),
                () => console.log('Request Complete'));

            nbProductObservable.subscribe(
                (coms: DropDown[]) => {
                    this.commercials = coms;
                    this.loading = false;
                    console.log(this.commercials);
                    if (this.commercials[0] != undefined) {
                        this.selectedCommercial = new DropDown(this.commercials[0].label, this.commercials[0].value);
                        this.com = this.selectedCommercial.label;
                    }

                },
            );

        }

    }


    dropDownValue(choosen: DropDown) {
        if (choosen) {
            this.com = choosen.label;
        }

    }



    removeProduct(brand: string, model: string, commercialEmail: string) {

        this.cartService.removeItemFromCart(brand, model, commercialEmail).subscribe(
            (c: Cart) => {
                this.cart = c;

                this.cartService.nbProduct().subscribe(
                    (articleNumber: number) => {
                        this.store.dispatch(new fromActions.AddToCartArticleAction(articleNumber));
                        this.loading = false;
                    },
                    err => console.log(err),
                    () => console.log('Request Complete'));

                this.dropDownService.commercials().subscribe(
                    (coms: DropDown[]) => {
                        if (coms.length > 0) {

                            this.commercials = coms;
                            this.selectedCommercial = new DropDown(this.commercials[0].label, this.commercials[0].value);
                            this.com = this.selectedCommercial.label;
                        }
                        this.loading = false;
                    },
                );
            },
        );
    }

    deleteProduct(brand: string, model: string) {
        console.log(this.com);
        this.confirmationService.confirm({
            message: "Etes vous sure de vouloir supprimer l'article du panier ?",
            accept: () => {

                this.removeProduct(brand, model, this.com);
                this.messageService.add({ severity: 'success', summary: 'Suppression', detail: "L'article à bien été supprimé du panier" });
            }


        });
    }

    display: boolean = false;

    showDialog() {
        this.display = true;
    }

    createQuoteFromCommercialCart() {

        var user = this.loginService.getAuthenticatedUser();
        if (user) {
            var jsonUser = JSON.parse(user.sub);
            if (jsonUser.roles[0] == 'GUEST') {
                this.userType = 'GUEST';
                this.router.navigate(['/login']);
            }
            else {
                var x = 0;
                for (let element of this.cart.listCommercialCartDto) {
                    if (this.com == element.commercial) {
                        this.commercialCart = element;
                        x = 1;
                        break;
                    }
                }

                if (x == 1) {
                    this.cartService.createQuote(this.commercialCart).subscribe(
                        (ref: string) => {
                            this.quoteRef = ref;
                            console.log(this.quoteRef);
                            this.loading = false;
                            this.router.navigate(['/quote-manager']);
                        },
                        err => console.log(err),
                        () => console.log('Request Complete'));

                    this.cartService.nbProduct().subscribe(
                        (articleNumber: number) => {
                            this.store.dispatch(new fromActions.AddToCartArticleAction(articleNumber));
                            this.loading = false;
                        },
                        err => console.log(err),
                        () => console.log('Request Complete'));

                    this.messageService.add({ severity: 'success', summary: 'Confirmation', detail: "La demande de devis à été generée" });
                }
            }
        }


    }

}
