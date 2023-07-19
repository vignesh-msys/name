import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';
import { CanComponentDeactivate } from 'src/app/services/candeactivate.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements CanComponentDeactivate {
  changesSaved = false;
  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  skillList: string[] = [];
  skill: string = '';
  name: string = '';
  email: string = '';
  age: number = 2;
  text: string = 'Create';
  id: number;

  ngOnInit() {
    this.route.params.subscribe((param: Params) => {
      if (param['id']) {
        this.text = 'Edit';
        this.id = param['id'];
        this.taskService.getuserById(+param['id']).subscribe((response) => {
          this.skillList = response.skills;
          this.name = response.name;
          this.age = response.age;
          this.email = response.email;
        });
      }
    });
  }

  addSkill() {
    if (this.skill === '') {
      alert('Skill Field should be filled...');
      return;
    }
    this.skillList.push(this.skill);
    this.skill = '';
  }

  onSubmit() {
    this.changesSaved = true;
    if (!this.name || !this.email) {
      alert('Please fill all fields...');
      return;
    }
    const user = {
      name: this.name,
      age: this.age,
      email: this.email || '',
      skills: this.skillList,
    };
    if (this.text === 'Create') {
      this.taskService.addUsers(user).subscribe(
        () => {
          alert('user added');
          this.router.navigate(['']);
        },
        () => alert('something went Wrong, please try again.')
      );
    } else {
      this.taskService.updateUser(user, this.id).subscribe(
        () => {
          alert('user Updated');
          this.router.navigate(['']);
        },
        () => alert('something went Wrong, please try again.')
      );
    }
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.name !== '' || this.email !== '') {
      return confirm('Do you really want to leave the page..?');
    } else {
      return true;
    }
  }
}
