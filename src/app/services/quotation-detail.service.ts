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
import { Discussion } from '../models/discussion';
import { Message } from '../models/message';



@Injectable()
export class QuotationDetailService {

  private appConfig = new AppConfig();

  constructor(public http: Http, private loginService: LoginService, public authHttp: AuthHttp) { }

  getDetail(reference: string): Observable<QuotationDetail> {
    var user = this.loginService.getAuthenticatedUser().sub;
    var jsonUser = JSON.parse(user);

    let body = JSON.stringify({ reference: reference, email : jsonUser.user });

    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    return this.authHttp.post(this.appConfig.urlBack + "/cart/customer/quotation/detail", body, { headers: headers })
        .map(res => {
            console.log(res);
            return res.json();
        }
        );
}

addMessage(discussion:Discussion): Observable<Discussion> {
    var user = this.loginService.getAuthenticatedUser().sub;
    var jsonUser = JSON.parse(user);

    let body = JSON.stringify({});

    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    return this.authHttp.post(this.appConfig.urlBack + "/cart/customer/quotation/detail/addMessage", discussion, { headers: headers })
        .map(res => {
            console.log(res);
            return res.json();
        }
        );
}


}
