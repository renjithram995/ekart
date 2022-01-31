import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanDeactivate } from "@angular/router";
import { Observable } from "rxjs";
import Utility from '../common/utility';

@Injectable()
export class AuthenticateLogin implements CanActivate {
    constructor(private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const isLoginPage = state.url?.toLowerCase() === '/login'
        const authenticationToken = Utility.decryptDataFromBrowser('token') || ''
        if (isLoginPage) {
            return Boolean(!authenticationToken) || this.router.createUrlTree([''])
        } else {
            return Boolean(authenticationToken) || this.router.createUrlTree(['/Login']);
        }
    }
}