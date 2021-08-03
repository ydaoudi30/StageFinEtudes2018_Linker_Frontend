import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app-config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { User } from '../models/user';
import { SelectedProduct } from '../models/selectedProduct';

import { Http, RequestOptions, Headers } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt'
import { LoginService } from './login.service';
import { Cart } from '../models/cart';
import { CommercialCart } from '../models/commercialCart';

@Injectable()
export class CartService {

  private appConfig = new AppConfig();

  constructor(private http: HttpClient, private loginService: LoginService, public authHttp: AuthHttp) { }

  cart(selectedProduct: SelectedProduct) {

    var user = this.loginService.getAuthenticatedUser()
    if (user) {

      var jsonUser = JSON.parse(user.sub);

      /*let body = JSON.stringify({ model: model, brand: brand, guestOrCustomerEmail: jsonUser.user, commercialEmail: commercialEmail });*/

      let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
      selectedProduct.guestOrCustomerEmail = jsonUser.user;

      return this.authHttp.post(this.appConfig.urlBack + "/cart/customer/cart", selectedProduct, { headers: headers })
        .map(res => res.json());
    }
  }

  nbProduct() {

    var user = this.loginService.getAuthenticatedUser();
    if (user) {
      var jsonUser = JSON.parse(user.sub);


      let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });

      return this.authHttp.post(this.appConfig.urlBack + "/cart/customer/cart/nbProduct", jsonUser.user, { headers: headers })
        .map(res => res.json());
    }
    else{
      return null;
    }
  }

  getCart(): Observable<Cart> {

    var user = this.loginService.getAuthenticatedUser();
    if (user) {
      var jsonUser = JSON.parse(user.sub);


      let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });

      return this.authHttp.post(this.appConfig.urlBack + "/cart/customer/cart/display", jsonUser.user, { headers: headers })
        .map(res => res.json());
    }
    else{
      return null;
    }
  }

  removeItemFromCart(brand: string, model: string, commercialEmail: string): Observable<Cart> {

    var user = this.loginService.getAuthenticatedUser();
    if (user) {
      var jsonUser = JSON.parse(user.sub);

      let body = JSON.stringify({ model: model, brand: brand, guestOrCustomerEmail: jsonUser.user, commercialEmail: commercialEmail });

      let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });

      return this.authHttp.post(this.appConfig.urlBack + "/cart/customer/cart/removeItem", body, { headers: headers })
        .map(res => res.json());
    }
  }


  createQuote(commercialCart: CommercialCart) {

    var user = this.loginService.getAuthenticatedUser();
    if (user) {
      var jsonUser = JSON.parse(user.sub);

      let body = JSON.stringify({ customerEmail: jsonUser.user, commercialCart: commercialCart });

      let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });

      return this.authHttp.post(this.appConfig.urlBack + "/cart/customer/cart/newQuote", body, { headers: headers })
        .map(res => res.text());
    }
  }

  fromGuestCartToCustomerCart(brand: string, model: string, guestEmail : string, commercialEmail: string): Observable<Cart> {

    var user = this.loginService.getAuthenticatedUser();
    if (user) {
      var jsonUser = JSON.parse(user.sub);

      let body = JSON.stringify({ model: model, brand: brand, guestEmail : guestEmail, customerEmail: jsonUser.user, commercialEmail: commercialEmail });

      let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });

      return this.authHttp.post(this.appConfig.urlBack + "/cart/customer/cart/mergeOneProduct", body, { headers: headers })
        .map(res => res.json());
    }
  }

  mergeCarts(guestEmail : string){

    var user = this.loginService.getAuthenticatedUser();
    if (user) {
      var jsonUser = JSON.parse(user.sub);

      let body = JSON.stringify({guestEmail : guestEmail, customerEmail: jsonUser.user});

      let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });

      return this.authHttp.post(this.appConfig.urlBack + "/cart/customer/cart/mergeAllProducts", body, { headers: headers })
        .map(res => res.json());
    }
  }


  clearGuest(guestEmail : string){

    var user = this.loginService.getAuthenticatedUser();
    if (user) {
      var jsonUser = JSON.parse(user.sub);

      let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });

      return this.authHttp.post(this.appConfig.urlBack + "/cart/guest/merge/deleteGuest", guestEmail, { headers: headers })
        .map(res => res.json());
    }
  }

}
