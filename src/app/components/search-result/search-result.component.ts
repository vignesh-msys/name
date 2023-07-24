import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interface/user';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
})
export class SearchResultComponent {
  searchQuery: string;
  filteredData: User[] = [];
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams) => {
      this.searchQuery = queryParams['query'];
      this.taskService.getUserData().subscribe((data) => {
        this.filteredData = data.filter(
          (item) =>
            item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            item.email.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    });
  }
}
