import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLogin: boolean = false;

  constructor(private auth: AuthServiceService, private router: Router) {}
  error: string | null = null;
  isLoading: boolean = false;

  handleSubmit(formData: NgForm) {
    this.isLoading = true;
    if (!formData.valid) return;
    let obs;
    if (!this.isLogin) {
      obs = this.auth.signUp(formData.value.email, formData.value.password);
    } else {
      obs = this.auth.signIn(formData.value.email, formData.value.password);
    }
    obs.subscribe({
      next: (v) => {
        this.isLoading = false;
        this.router.navigate([''])
      },
      error: (e) => {
        this.error = e;
        this.isLoading = false;
      },
    });
    setTimeout(() => {
      this.error = null;
    }, 2000);
  }
}
