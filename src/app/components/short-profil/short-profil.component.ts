import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { Store } from '../../../../node_modules/@ngrx/store';
import { ConnectedState } from '../../redux/states/connected.state';
import * as connectAction from '../../redux/actions/connect.action';
import { AccountService } from '../../services/account.service';
import { AccountDetails } from '../../models/account';

@Component({
    selector: 'short-profil',
    templateUrl: './short-profil.component.html',
    styleUrls: ['./short-profil.component.css']
})
export class ShortProfilComponent implements OnInit {

    @Input() loggedIn: boolean;
    user : AccountDetails;

    constructor(private loginService: LoginService, private storeConnect: Store<ConnectedState>, private router: Router, private accountService : AccountService) { }

    items: MenuItem[];
    
    ngOnInit() {
        
        this.items = [
            {
                label: 'Mon compte',
                icon: 'fa-user-circle',
                command: (event) => {
                    
                }
            },
            {
                label: 'Préparation des devis',
                icon: 'fa-align-right',
                routerLink : '/quote-manager'
            },
            {
                label: 'Demandes des devis',
                icon: 'fa-th-large',
                routerLink : '/quotation-list'
            },
            {
                label: 'Deconnexion',
                icon: 'fa-sign-out',
                command: (event) => {
                    this.logOut();
                }
            }   
        ];

        var user = this.loginService.getAuthenticatedUser();
        var jsonUser = JSON.parse(user.sub);
        this.accountService.getUserDetails(jsonUser.user).subscribe(result => {
            this.user = result;
        });
    }

    logOut() {
        this.loginService.logOut();
        this.storeConnect.dispatch(new connectAction.ChangeState(false));
        this.router.navigate(['/home']);
    }

}
