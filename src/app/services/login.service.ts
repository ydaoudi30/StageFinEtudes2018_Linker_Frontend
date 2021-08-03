import { Injectable } from '@angular/core';
import { AppConfig } from '../app-config';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class LoginService {

    private appConfig = new AppConfig();

    private jwtHelper: JwtHelper = new JwtHelper();

    constructor(private http: Http) { }

    authenticateCustomer(email: String, password: String) {
        let loginRequest = JSON.stringify({ email: email, password: password, roles : ['CUSTOMER']});
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        return this.http.post(this.appConfig.loginUrl, loginRequest, { headers: headers })
            .map(resp => {
                var tokens = resp.headers.get('authorization').split(" ", 2);
                if (tokens) {
                    let userCreds = this.jwtHelper.decodeToken(tokens[1]);

                    let occurence = 0;
                    this.appConfig.userRequiredProfile.forEach(profile => {
                        if (JSON.parse(userCreds.sub).roles.indexOf(profile) > -1) {
                            occurence++;
                        }
                    });

                    if (occurence != 0) {
                        localStorage.setItem('cust_token', tokens[1]);
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            });
    }

    authenticateGuest(email: String, password: String) {
        let loginRequest = JSON.stringify({ email: email, password: password, roles : ['GUEST']});
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        return this.http.post(this.appConfig.loginUrl, loginRequest, { headers: headers })
            .map(resp => {
                var tokens = resp.headers.get('authorization').split(" ", 2);
                if (tokens) {
                    let userCreds = this.jwtHelper.decodeToken(tokens[1]);

                    let occurence = 0;
                    this.appConfig.userRequiredProfile.forEach(profile => {
                        if (JSON.parse(userCreds.sub).roles.indexOf(profile) > -1) {
                            occurence++;
                        }
                    });

                    if (occurence != 0) {
                        localStorage.setItem('cust_token', tokens[1]);
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            });
    }

    logOut() {
        localStorage.removeItem('cust_token');
    }

    getAuthenticatedUser() {
        var token = localStorage.getItem('cust_token');
        
        if (token && !this.jwtHelper.isTokenExpired(token))
            return this.jwtHelper.decodeToken(token); // token
    }

    isUserLoggedIn(){
        var token = localStorage.getItem('cust_token');
        
        if (token)
            if(!this.jwtHelper.isTokenExpired(token))
                return true;

        return false;
    }
}
