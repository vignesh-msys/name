import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthServiceService } from 'src/app/auth/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGaurd {
  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

  canActivate(
    Route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.user.pipe(
      take(1),
      map((user) => {
        console.log(user)
        const isAuth = !!user;
        if (isAuth) return true;
        return this.router.createUrlTree(['/auth']);
      })
    );
  }
}
