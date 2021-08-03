import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class AuthGuardService {

 constructor(private router: Router) {}

 canActivate() {
   if(this.loggedIn()) {
     return true;
   } else {
     this.router.navigate(['login']);
     return false;
   }
 }

 loggedIn() {
   return tokenNotExpired();
 }

} /*ne sert pas pour le moment*/
