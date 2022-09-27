import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { info } from 'console';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class NoAuthGuard implements CanActivate {

    constructor(private auth: AuthService, private route: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | boolean {
        if (!this.auth.isLoggedIn) {
            return true;
        }
        this.route.navigate(['/profile']);
        return false;
    }
}