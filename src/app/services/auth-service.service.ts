import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  login: boolean = true;
  isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.login);
      }, 200);
    });
    return promise;
  }

  onLogin() {
    this.login = true;
  }
  onLogOut() {
    this.login = false;
  }
}
