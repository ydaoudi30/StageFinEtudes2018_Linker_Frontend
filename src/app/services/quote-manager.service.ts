import { Injectable } from '@angular/core';
import { QuotationDetail } from '../models/quotationDetail';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app-config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { User } from '../models/user';
import { Http, RequestOptions, Headers } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { LoginService } from './login.service';


@Injectable()
export class QuoteManagerService {

  private appConfig = new AppConfig();

  constructor(private http: HttpClient, private loginService: LoginService, public authHttp: AuthHttp) { }

  getQuotations(): Observable<QuotationDetail[]> {

    var user = this.loginService.getAuthenticatedUser();
    if(user){

    
    var jsonUser = JSON.parse(user.sub);

    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    
		return this.authHttp.post(this.appConfig.urlBack + "/cart/customer/quote/inPreparationQuotes", jsonUser.user, { headers: headers })
      .map(res => res.json());
    }
  }
  
  getNewQuote(quote: QuotationDetail){
    var email = this.loginService.getAuthenticatedUser().sub;

    let connectedUser = JSON.stringify({ email: email, password: "" });
    console.log(connectedUser);

    let body = JSON.stringify({ quote: quote });

    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    return this.authHttp.post(this.appConfig.urlBack + "/cart/customer/quote/generateNewQuote", quote, { headers: headers })
        .map(res => {
            console.log(res);
            return res.json();
        }
        );
}

removeItem(model : String, brand : String, quoteRef : String, commercial : string) : Observable<QuotationDetail[]>{
  var email = this.loginService.getAuthenticatedUser().sub;

  let connectedUser = JSON.stringify({ email: email, password: "" });
  console.log(connectedUser);

  var user = this.loginService.getAuthenticatedUser().sub;
  var jsonUser = JSON.parse(user);

  let body = JSON.stringify({ model: model, brand: brand, quoteRef : quoteRef, customer: jsonUser.user, commercial : commercial});

  let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
  return this.authHttp.post(this.appConfig.urlBack + "/cart/customer/quote/removeProduct", body, { headers: headers })
  .map(res => res.json());
}


}
