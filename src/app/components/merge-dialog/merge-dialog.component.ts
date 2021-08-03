import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'primeng/components/common/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { FormGroup, FormControl, Validators, ValidationErrors, FormArray } from '@angular/forms';
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
import * as connectedReducer from '../../redux/reducers/connect.reducer';
import * as connectAction from '../../redux/actions/connect.action';
import { CartState } from '../../redux/states/cart.state';
import { ConnectedState } from '../../redux/states/connected.state';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Http, RequestOptions, Headers } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-merge-dialog',
  templateUrl: './merge-dialog.component.html',
  styleUrls: ['./merge-dialog.component.css']
})
export class MergeDialogComponent implements OnInit {

    msgs: Message[] = [];
    loginForm: FormGroup;
    @Input() guestEmail: string = undefined;
    customerEmail: string = undefined;
    @Input()display: boolean = false;

    cart: Cart;
    commercialCart: CommercialCart;
    loading: boolean;
    commercials: DropDown[];
    selectedCommercial: DropDown;
    com: string;
    disableButton: boolean = true;
    num: number = 0;
    flag: number;
    userType: string;


  constructor(private cartService: CartService,
    private dropDownService: DropDownService,
    private messageService: MessageService,
    private store: Store<CartState>,
    private storeConnect: Store<ConnectedState>,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
    private router: Router,
    public http: Http,
    private loginService: LoginService,
    public authHttp: AuthHttp) { }

  ngOnInit() {
    var user = this.loginService.getAuthenticatedUser();
    if (user != null) {
        var jsonUser = JSON.parse(user.sub);
        console.log(jsonUser.user);
        if (jsonUser.roles[0] == 'GUEST') {
            this.guestEmail = jsonUser.user;
            this.disableButton = false;
            console.log(jsonUser.user);

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
    }

}

dropDownValue(choosen: DropDown) {
    if (choosen) {
        this.com = choosen.label;
    }

}

get email() { return this.loginForm.get('email'); }
get password() { return this.loginForm.get('password'); }

retour() {
    this.router.navigate(['/home']);
}

mergeOne(brand: string, model: string, commercialEmail: string) {
    let forMergeObservable = this.cartService.fromGuestCartToCustomerCart(brand, model, this.guestEmail, commercialEmail);
    let nbProductObservable = this.dropDownService.GuestCartCommercials(this.guestEmail);
    if (forMergeObservable && nbProductObservable) {
        forMergeObservable.subscribe(
            (c: Cart) => {
                this.cart = c;
                this.loading = false;
                console.log(this.cart);
                this.messageService.add({ severity: 'success', summary: 'Confirmation', detail: "Le produit a été ajouté a votre panier" });     
                this.cartService.nbProduct().subscribe(
                    (articleNumber: number) => {
                        this.store.dispatch(new fromActions.AddToCartArticleAction(articleNumber));
                        this.loading = false;
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

                if(this.cart.listCommercialCartDto.length == 0){
                    this.cartService.clearGuest(this.guestEmail).subscribe(
                        (num: number) => {
                           this.flag = num;
                           console.log(this.flag);
                           this.router.navigate(['/cart']);
                           this.messageService.add({ severity: 'success', summary: 'Confirmation', detail: "Les deux paniers ont été entièrement fusionnés" });

                        },
                    );
                }

            },
            err => console.log(err),
            () => console.log('Request Complete'));


    }
}


mergeAll(){
    let forMergeObservable = this.cartService.mergeCarts(this.guestEmail);
    if(forMergeObservable){
        forMergeObservable.subscribe(
            (int: number) => {
                this.num = int;
                this.loading = false;
                this.router.navigate(['/cart']);
                this.messageService.add({ severity: 'success', summary: 'Confirmation', detail: "Les deux paniers ont bien été fusionnés" }); 
                
                this.cartService.clearGuest(this.guestEmail).subscribe(
                    (num: number) => {
                       this.flag = num;
                       console.log(this.flag);
    
                    },
                );
            },
            err => console.log(err),
            () => console.log('Request Complete'));
    }
}

}
