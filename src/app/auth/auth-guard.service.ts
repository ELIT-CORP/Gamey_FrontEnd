import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { info } from 'console';
import { Observable } from 'rxjs';
import { FirestoreDataService } from '../shared/firestore-data.service';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    user: any;
    constructor(private auth: AuthService, private route: Router, private afs: FirestoreDataService) {}

    // constructor(public auth: AuthService, public route: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | boolean | Promise<boolean>{
        const user = this.checkUserLoging()
        if(typeof user !== 'boolean') {
            return this.checkUserCharacter(user)
        } else {
            return user
        }
    }
    
    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.canActivate(next, state);
    }

    checkUserLoging(): any {
        const user = this.auth.isLoggedIn();
        if (user != null) {
            return user;
        }         
        this.route.navigate(['']);
        return false;       
    }

    async checkUserCharacter(user: any) : Promise<boolean> {
        if (await this.afs.userHasProfile(user) == false) {
            this.route.navigate(['/**']);
            return false;
        }
        return true;       
    }
}