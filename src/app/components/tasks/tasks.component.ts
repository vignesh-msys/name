import { Component } from '@angular/core';
import { User } from 'src/app/interface/user';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  userData: User[] = [];
  userData1: User[] = [];
  modalVisibility: boolean = false;
  constructor(private taskService: TaskService) {}
  query: string;

  ngOnInit(): void {
    this.taskService.getUserData().subscribe((data) => {
      this.userData = data;
      this.userData1 = data;
    });
  }

  toggleModalVisibility() {
    this.modalVisibility = !this.modalVisibility;
  }

  deleteUser(user: User) {
    this.taskService.deleteUser(user).subscribe(() => {
      this.userData = this.userData.filter((item) => item.id !== user.id);
    });
  }

  handleQuery() {
    const wholeData = this.userData1;
    if (this.query !== '') {
      this.userData = wholeData.filter((item) =>
        item.name.includes(this.query)
      );
    } else {
      this.userData = this.userData1;
    }
  }

  toggleVerified(user: User) {
    user.verified = !user.verified;
    this.taskService.updateUserVerified(user).subscribe();
  }
  postData(uData: User) {
    this.taskService.addUsers(uData).subscribe(
      (task) => {
        this.userData.push(task);
        this.modalVisibility = false;
      },
      () => alert('something went Wrong, please try again.')
    );
  }
}
