import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AuthServiceService } from 'src/app/auth/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isAuthenticated: boolean = false;
  query: string;
  faSearch = faSearch;
  private sub: Subscription;

  constructor(private router: Router, private auth: AuthServiceService) {}

  ngOnInit() {
    this.sub = this.auth.user.subscribe(
      (user) => (this.isAuthenticated = !!user)
    );
  }

  handleLogout() {
    this.auth.handleLogout();
  }

  handleQuery() {
    if (!this.query) {
      alert('Please provide input...');
      return;
    }
    this.router.navigate(['/search'], {
      queryParams: {
        query: this.query,
      },
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
