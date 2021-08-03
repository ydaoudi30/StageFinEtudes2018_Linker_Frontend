import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { tokenNotExpired } from 'angular2-jwt';
import { LoginService } from './services/login.service';
import { GuestService } from './services/guest.service';
import { User } from './models/user';
import { Message } from '../../node_modules/primeng/api';

@Component({
    selector: 'administration-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    msgs: Message[] = [];
    private languages: any[] = ["ar", "fr", "en"];
    private curlang: any = this.languages[1];

    visibleSideBar: boolean = false;

    ngOnInit() {
    }

    constructor(private translate: TranslateService, private loginService: LoginService, private guestService: GuestService) {
        translate.setDefaultLang(this.curlang);
    }

    setlanguage(id: any): void {
        this.translate.setDefaultLang(id);
    }


    switchLanguage(language: string) {
        this.translate.use(language);
    }

    loggedIn() {
        return tokenNotExpired();
    }
    showSideBar($event) {
        this.visibleSideBar = $event;
    }

}
