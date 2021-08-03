import { Injectable } from '@angular/core';
import { Article } from '../models/article';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app-config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

@Injectable()
export class ArticleService {

    private appConfig = new AppConfig();
    private articles :Article[];
    constructor( private http: HttpClient ) { }



    getRemotePersons(): Observable<any> {
        return this.http.get( this.appConfig.urlBack + '/person' ).map((res => res));
    }
    
    getAllArticles(): Observable<any> {
        return this.http.get( this.appConfig.urlBack + '/articles' ).map((res => res));
    }
}