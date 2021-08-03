import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app-config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { User } from '../models/user';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { LoginService } from './login.service';
import { ProductCard } from '../models/productcard';
import { Product } from '../models/product';
import { FilterRange } from '../models/filterrange';
import { SearchResult } from '../models/searchresult';
import { ProductCart } from '../models/productCart';
import { ProductWithCommercials } from '../models/product-commercials';
import { ObjectRangeToSend } from '../models/objectRangeToSend';


@Injectable()
export class SearchProductsService {

    private appConfig = new AppConfig();

    constructor(public http: Http, private loginService: LoginService, public authHttp: AuthHttp) {
        console.log('Category Service Connected...');
    }

    getProducts(): Observable<ProductCard[]> {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        return this.http.get(this.appConfig.urlBack + "/product/search/new-products", { headers: headers })
            .map(res => res.json());
    }

    newProducts(): Observable<ProductCard[]> {
        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        return this.http.get(this.appConfig.urlBack + "/product/search/latests", { headers: headers })
            .map(res => res.json());
    }

    getProductsByCategory(refCat: string): Observable<SearchResult> {

        let params: URLSearchParams = new URLSearchParams();
        params.set('refCategory', refCat);

        let requestOptions = new RequestOptions();
        requestOptions.search = params;

        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        requestOptions.headers = headers;

        return this.http.get(this.appConfig.urlBack + "/product/search/bycategoryref", requestOptions)
            .map(res => {
                console.log(res);
                return res.json();
            }
            );
    }

    getProductsByKeyword(keyword: string): Observable<SearchResult> {

        let params: URLSearchParams = new URLSearchParams();
        params.set('keyword', keyword);

        let requestOptions = new RequestOptions();
        requestOptions.search = params;

        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        requestOptions.headers = headers;

        return this.http.get(this.appConfig.urlBack + "/product/search/bykeyword", requestOptions)
            .map(res => {
                console.log(res);
                return res.json();
            });
    }

    getProductsByRangeFilter(keyword: string, label: string, min: number, max: number, unit: string): Observable<SearchResult> {

        let body = JSON.stringify({ keyword: keyword, label: label ,min: min, max: max, unit: unit});

        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });

        return this.http.post(this.appConfig.urlBack + "/product/search/byRangeFilter", body , { headers: headers })
            .map(res => { return res.json(); });
    }

    getProductByDropDownFilter(keyword: string,label: string,value: string): Observable<SearchResult> {

        let body = JSON.stringify({ keyword: keyword,label: label,value: value});

        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });

        return this.http.post(this.appConfig.urlBack + "/product/search/byDropDownFilter", body, { headers: headers })
            .map(res => { return res.json(); });
    }

    getProductsByRangeFilterCat(refCat: string, label: string, min: number, max: number, unit: string): Observable<SearchResult> {

        let body = JSON.stringify({ refCat: refCat, label: label ,min: min, max: max, unit: unit});

        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });

        return this.http.post(this.appConfig.urlBack + "/product/search/byRangeFilterCat", body , { headers: headers })
            .map(res => { return res.json(); });
    }

    getProductByDropDownFilterCat(refCat: string,label: string,value: string): Observable<SearchResult> {

        let body = JSON.stringify({ refCat: refCat,label: label,value: value});

        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });

        return this.http.post(this.appConfig.urlBack + "/product/search/byDropDownFilterCat", body, { headers: headers })
            .map(res => { return res.json(); });
    }



    getProductByBrandAndModel(model: string, brand: string): Observable<ProductWithCommercials> {

        let productSearchBody = JSON.stringify({ model: model, brand: brand });

        let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });

        return this.http.post(this.appConfig.urlBack + "/product/search/by-brand-and-model", productSearchBody, { headers: headers })
            .map(res => { return res.json(); });
    }
}