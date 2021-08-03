import { Injectable } from '@angular/core';
import { AppConfig } from '../app-config';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";
import { JwtHelper } from 'angular2-jwt';
import { User } from '../models/user';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { LoginService } from './login.service';


@Injectable()
export class GuestService {

    private appConfig = new AppConfig();

    private jwtHelper: JwtHelper = new JwtHelper();

    constructor(public http: Http, private loginService: LoginService, public authHttp: AuthHttp) { }

    createGuest(): Observable<User> {
	
			let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
			return this.http.get(this.appConfig.urlBack + "/cart/guest", { headers: headers })
				.map(res => res.json());
		
	}

}
