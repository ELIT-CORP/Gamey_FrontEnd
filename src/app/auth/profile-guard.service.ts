import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { info } from 'console';
import { Observable } from 'rxjs';
import { FirestoreDataService } from '../shared/firestore-data.service';
import { AuthService } from './auth.service';

@Injectable()
export class ProfileGuard implements CanActivate {
    user: any;
    constructor(private auth: AuthService, private route: Router, private afs: FirestoreDataService) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | boolean {
        if (this.auth.isLoggedIn) {
            this.checkHasCharacter();
            return true;
        }
        this.route.navigate(['']);
        return false;
    }

    checkHasCharacter() {
        return false;
    }
}