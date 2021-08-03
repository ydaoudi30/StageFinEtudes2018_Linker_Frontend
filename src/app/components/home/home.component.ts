import { Component, OnInit } from '@angular/core';

import { CartService } from '../../services/cart.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as cartReducer from '../../redux/reducers/cart.reducer';
import * as fromActions from '../../redux/actions/cart.action';
import { CartState } from '../../redux/states/cart.state';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading: boolean;

  constructor(private cartService: CartService,private store: Store<CartState>) { }

  ngOnInit() {

    let nbProductObservable = this.cartService.nbProduct();
    if(nbProductObservable){
      nbProductObservable.subscribe(
        (articleNumber : number) => {
          this.store.dispatch(new fromActions.AddToCartArticleAction(articleNumber));
          this.loading = false;
        },
        err => console.log(err),
        () => console.log('Request Complete'));
    }

  }

}
