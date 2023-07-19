import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/interface/user';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  data: User = {
    name: '',
    age: 0,
    email: '',
    skills: [],
  };
  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((param: Params) => {
      this.taskService.getuserById(+param['id']).subscribe((response) => {
        this.data = response;
      });
    });
  }
}
