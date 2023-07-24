import { Component } from '@angular/core';
import { User } from 'src/app/interface/user';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  userData: User[] = [];
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getUserData().subscribe((data) => {
      this.userData = Object.values(data);
    });
  }

  deleteUser(user: User) {
    this.taskService.deleteUser(user).subscribe(() => {
      this.userData = this.userData.filter((item) => item.id !== user.id);
    });
  }
}
