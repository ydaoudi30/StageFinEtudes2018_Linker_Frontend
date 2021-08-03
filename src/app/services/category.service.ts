import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app-config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { User } from '../models/user';
import { Http, RequestOptions, Headers } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { LoginService } from './login.service';
import { Category } from '../models/category';


@Injectable()
export class CategoryService {

    private appConfig = new AppConfig();

    constructor(public http: Http, private loginService: LoginService, public authHttp: AuthHttp) {
        console.log('Category Service Connected...');
    }

    getCategories(): Observable<Category[]> {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        return this.http.get(this.appConfig.urlBack + "/category/list", { headers: headers })
            .map(res => res.json());
    }
}