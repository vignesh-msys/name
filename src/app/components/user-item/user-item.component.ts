import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/interface/user';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css'],
})
export class UserItemComponent {
  @Input() user: User;
  @Output() handleDelete: EventEmitter<User> = new EventEmitter();
  @Output() handleToggle: EventEmitter<User> = new EventEmitter();
  faTimes = faTimes;
  id: number;
  constructor(private router: Router) {}

  onDelete(user: User, e: any) {
    e.preventDefault();
    e.stopPropagation();
    this.handleDelete.emit(user);
    this.router.navigate(['']);
  }
}
