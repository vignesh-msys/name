import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  query: string;
  faSearch = faSearch;

  constructor(private router: Router) {}

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
}
