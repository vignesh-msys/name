import { Component } from '@angular/core';
import { AuthServiceService } from './auth/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'first-app';

  constructor(private auth: AuthServiceService) {}

  ngOnInit() {
    this.auth.autoLogin();
  }
}
