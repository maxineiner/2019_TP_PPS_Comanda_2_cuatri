import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth";
import { map } from "rxjs/operators";
import { isNullOrUndefined } from 'util';

import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NoLogInGuard implements CanActivate {

  constructor(private AFauth : AngularFireAuth,
    private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return this.AFauth.authState.pipe(map( auth => {
        if(isNullOrUndefined(auth)){
          return true
        }else{
          this.router.navigate(['/home']);
          return false
        }
        // console.log(auth);
        // return false;
      }))

  
  }
}