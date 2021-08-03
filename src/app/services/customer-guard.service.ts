import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { LoginService } from './login.service';

@Injectable()
export class CustomerGuardService {

  constructor(private loginService: LoginService) { }


  canActivate() {
    var user = this.loginService.getAuthenticatedUser();
    if (user != null) {
        var jsonUser = JSON.parse(user.sub);
        
        if(this.loginService.isUserLoggedIn() && jsonUser.roles[0] == 'CUSTOMER') {
            console.log("Logged IN ....");
            return true;
          } else {
            return false;
          }
    }

  }
}
