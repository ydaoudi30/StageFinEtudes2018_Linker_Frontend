import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { LoginService } from './login.service';

import { CustomerGuardService } from './customer-guard.service';
import { GuestGuardService } from './guest-guard.service';

import { GUARDS } from '../models/guards';
import { GuestService } from './guest.service';
import { User } from '../models/user';

@Injectable()
export class MasterGuardService {

    private user: User;
    private loading: boolean;

    constructor(private guestService: GuestService, private router: Router, private loginService: LoginService, private customerGuardService: CustomerGuardService, private guestGuardService: GuestGuardService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        console.log("Checking ....");
        let data = route.data;
        let operator = data.trigger.operator;
        let guards = data.trigger.guards
        let groupedCanActivate = false;
        if (operator == 'OR') {
            groupedCanActivate = this.activateGuardsWithOR(guards);
        }
        // Implements other cases ....

        this.authicateGuestUser();

        if (groupedCanActivate) {
            return true;
        } else {
            return false;
        }
    }

    activateGuardsWithOR(guards: string[]): boolean {

        for (let guard of guards) {
            let guardInstance = this.getGuardInstance(guard);
            if (guardInstance.canActivate()) {
                return true;
            }
        }

        return false;
    }


    //Create an instance of the guard and fire canActivate method returning a promise
    getGuardInstance(guardKey: string) {

        let guard: CustomerGuardService | GuestGuardService;

        switch (guardKey) {
            case GUARDS.GuestGuard:
                guard = new GuestGuardService(this.loginService);
                break;
            case GUARDS.CustomerGuard:
                guard = new CustomerGuardService(this.loginService);
                break;
            default:
                break;
        }
        return guard;
    }

    authicateGuestUser(){
        let user = this.loginService.getAuthenticatedUser();
        if (!user) {
            console.log("connecting...");
            this.guestService.createGuest().subscribe(
                (guest: User) => {
                    this.user = guest;
                    this.loading = false;
                    this.loginService.authenticateGuest(this.user.email, null).subscribe(
                        response => {
                            var user = this.loginService.getAuthenticatedUser();
                            var jsonUser = JSON.parse(user.sub);
                            this.router.navigate(['/home']);
                        },
                    );
                },
                err => console.log(err),
                () => console.log('Request Complete'));
            this.user = null;
        }
    }
}
