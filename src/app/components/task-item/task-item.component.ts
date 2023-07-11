import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/interface/user';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent {
  @Input() user: User;
  @Output() handleDelete: EventEmitter<User> = new EventEmitter();
  @Output() handleToggle: EventEmitter<User> = new EventEmitter();
  faTimes = faTimes;

  constructor() {}
  onDelete(user: User) {
    this.handleDelete.emit(user);
  }
  onToggle(user: User) {
    this.handleToggle.emit(user);
  }
}
