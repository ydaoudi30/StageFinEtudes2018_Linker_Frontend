import { Injectable } from '@angular/core';
import { AppConfig } from '../app-config';
import { LoginService } from './login.service';
import { AuthHttp } from '../../../node_modules/angular2-jwt';
import { Observable } from '../../../node_modules/rxjs';
import { AccountDetails } from '../models/account';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AccountService {
    private appConfig = new AppConfig();

    constructor(private http: Http, private loginService: LoginService, public authHttp: AuthHttp) { }

    createCustomerAccount(accountDetails : AccountDetails) {

        let request = JSON.stringify(accountDetails);
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        return this.http.post(this.appConfig.accountUrl + "/customer", request, { headers: headers });

    }

    createCommercialAccount(accountDetails : AccountDetails) {

        let request = JSON.stringify(accountDetails);
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        return this.http.post(this.appConfig.accountUrl + "/commercial", request, { headers: headers });

    }

    getUserDetails(email : string) : Observable<AccountDetails>{
        let request =  JSON.stringify({ email: email });
        console.log(request);
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        return this.http.post(this.appConfig.accountUrl + "/user/get-detail", request, { headers: headers }).map(resp => resp.json());
    }

}
