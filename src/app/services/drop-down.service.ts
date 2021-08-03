import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DropDown } from '../models/dropDown';
import { AppConfig } from '../app-config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { User } from '../models/user';
import { Http, RequestOptions, Headers } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { LoginService } from './login.service';

@Injectable()
export class DropDownService {
    private appConfig = new AppConfig();

    constructor(public http: Http, private loginService: LoginService, public authHttp: AuthHttp) { }

    commercials(): Observable<DropDown[]> {

        var user = this.loginService.getAuthenticatedUser();
        if (user) {
            var jsonUser = JSON.parse(user.sub);

            let connectedUser = JSON.stringify({ email: jsonUser.user, roles: jsonUser.roles, password: "" });
            console.log(connectedUser);

            let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
            return this.authHttp.post(this.appConfig.commonUrlBack + "/dorpdown/values/commercials", connectedUser, { headers: headers })
                .map(res => {
                    console.log(res);
                    return res.json();
                }
                );

        }
    }

    GuestCartCommercials(guestEmail : string): Observable<DropDown[]> {

        var user = this.loginService.getAuthenticatedUser();
        if (user) {

            let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
            return this.authHttp.post(this.appConfig.commonUrlBack + "/dorpdown/values/GuestCartCommercials", guestEmail, { headers: headers })
                .map(res => {
                    console.log(res);
                    return res.json();
                }
                );

        }
    }

    commercialsQuote(): Observable<DropDown[]> {

        var user = this.loginService.getAuthenticatedUser().sub;
        var jsonUser = JSON.parse(user);

        let connectedUser = JSON.stringify({ email: jsonUser.user, roles: jsonUser.roles, password: "" });
        console.log(connectedUser);

        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        return this.authHttp.post(this.appConfig.commonUrlBack + "/dorpdown/values/inPreparationQuotesCommercials", connectedUser, { headers: headers })
            .map(res => {
                console.log(res);
                return res.json();
            }
            );
    }

    status(): Observable<DropDown[]> {

        var user = this.loginService.getAuthenticatedUser().sub;
        var jsonUser = JSON.parse(user);

        let connectedUser = JSON.stringify({ email: jsonUser.user, roles: jsonUser.roles, password: "" });
        console.log(connectedUser);

        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        return this.authHttp.post(this.appConfig.commonUrlBack + "/dorpdown/values/status", connectedUser, { headers: headers })
            .map(res => {
                console.log(res);
                return res.json();
            }
            );
    }

}
