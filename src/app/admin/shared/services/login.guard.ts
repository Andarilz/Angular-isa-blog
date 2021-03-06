import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {AuthService} from './auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(
        private auth: AuthService,
        private router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (this.auth.isAuthenticated()) {
            this.router.navigate(['/admin', 'dashboard'], {
                queryParams: {
                    loginShouldNotBe: true
                }
            });
        } else {
            return true;
        }
    }

}
