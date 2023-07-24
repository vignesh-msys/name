import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  user = new BehaviorSubject<User | null>(null);
  constructor(private http: HttpClient, private router: Router) {}
  private tokenExpiration: any;

  handleLogout() {
    this.user.next(null);
    localStorage.clear();
    this.router.navigate(['auth']);
    if (this.tokenExpiration) {
      clearTimeout(this.tokenExpiration);
    }
    this.tokenExpiration = null;
  }

  autoLogout(expirationTime: number) {
    this.tokenExpiration = setTimeout(
      () => this.handleLogout(),
      expirationTime
    );
  }

  signIn(email: string, password: string) {
    return this.http
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCkh2Cu167YQS7hUwiBGcORL7BxciBEAU8',
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((res: any) =>
          this.handleAuthentication(
            res.email,
            res.localId,
            res.idToken,
            res.expiresIn
          )
        )
      );
  }

  signUp(email: string, password: string) {
    return this.http
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCkh2Cu167YQS7hUwiBGcORL7BxciBEAU8',
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((res: any) =>
          this.handleAuthentication(
            res.email,
            res.localId,
            res.token,
            res.expiresIn
          )
        )
      );
  }

  handleAuthentication(email: string, id: number, token: string, exp: Date) {
    const expDate = new Date(new Date().getTime() + +exp * 1000);
    const user = new User(email, id, token, expDate);
    this.user.next(user);
    this.autoLogout(+exp * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  autoLogin() {
    const user = localStorage.getItem('userData');
    const parsedUser = user && JSON.parse(user);
    if (!parsedUser) return;

    const loadedUser = new User(
      parsedUser.email,
      parsedUser.id,
      parsedUser._token,
      parsedUser._tokenExp
    );

    if (loadedUser.token) {
      const expiresIn =
        new Date(parsedUser._tokenExp).getTime() - new Date().getTime();
      this.autoLogout(expiresIn);
      this.user.next(loadedUser);
    }
  }

  handleError(error: HttpErrorResponse) {
    let errorMsg = 'something went wrong...';
    if (!error.error || !error.error.error) {
      return throwError(errorMsg);
    }
    switch (error.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMsg = 'This email is already registered.';
        break;
    }
    return throwError(errorMsg);
  }
}
