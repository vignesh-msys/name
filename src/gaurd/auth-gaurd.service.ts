import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service.service';

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
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated().then((auth):boolean => {
      if (auth) {
        return true;
      } else {
        this.router.navigate(['']);
        return false;
      }
    });
  }

}
