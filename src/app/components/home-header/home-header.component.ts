import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '../../services/cart.service';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as cartReducer from '../../redux/reducers/cart.reducer';
import * as fromActions from '../../redux/actions/cart.action';
import { CartState } from '../../redux/states/cart.state';
import { MenuItem } from 'primeng/api';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { CustomerGuardService } from '../../services/customer-guard.service';
import { GuestGuardService } from '../../services/guest-guard.service';
import * as connectedReducer from '../../redux/reducers/connect.reducer';
import * as connectAction from '../../redux/actions/connect.action';
import { ConnectedState } from '../../redux/states/connected.state';
import { BoundNodeCallbackObservable } from 'rxjs/observable/BoundNodeCallbackObservable';
@Component({
    selector: 'app-home-header',
    templateUrl: './home-header.component.html',
    styleUrls: ['./home-header.component.css']
})
export class HomeHeaderComponent implements OnInit {

    articleNumber: number;
    loading: boolean;
    nbArticle: Observable<number>
    userType: string = null;
    connected: boolean;
    @Input() loggedIn: boolean;



    constructor(private cartService: CartService, private store: Store<CartState>, private loginService: LoginService, private router: Router, private customerGuardService: CustomerGuardService, private storeConnect: Store<ConnectedState>) {
        store.select(cartReducer.getCartNbArticles).subscribe(
            (nombre: number) => {
                this.articleNumber = nombre;
            }
        );

        storeConnect.select(connectedReducer.getState).subscribe(
            (x: boolean) => {
                this.connected = x;
            }
        );

    }

    ngOnInit() {


        this.userType = 'CUSTOMER';
        this.connected = this.customerGuardService.canActivate();
        console.log(this.connected);
        let cartObservable = this.cartService.nbProduct();
        if (cartObservable) {
            cartObservable.subscribe(
                (num: number) => {
                    this.store.dispatch(new fromActions.AddToCartArticleAction(num));
                    this.loading = false;
                },
                err => console.log(err),
                () => console.log('Request Complete'));
        }
        else {
            this.store.dispatch(new fromActions.AddToCartArticleAction(0));
        }
    }

}
