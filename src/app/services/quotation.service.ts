import { Injectable } from '@angular/core';
import { Quotation } from '../models/quotation';
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
export class QuotationService {

	private appConfig = new AppConfig();

	constructor(public http: Http, private loginService: LoginService, public authHttp: AuthHttp) { }

	getQuotations(): Observable<Quotation[]> {
		var user = this.loginService.getAuthenticatedUser();

		if (user) {


			var jsonUser = JSON.parse(user.sub);

			let connectedUser = JSON.stringify({ email: jsonUser.user, roles: jsonUser.roles, password: "" });
			console.log(connectedUser);

			let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
			return this.authHttp.post(this.appConfig.urlBack + "/cart/customer/quotationsList", connectedUser, { headers: headers })
				.map(res => res.json());
		}
	}

}
