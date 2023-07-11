import { Component, Output, EventEmitter, Input } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/interface/user';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent {

  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  @Output() handleSubmit: EventEmitter<User> = new EventEmitter();

  @Input() total: number;

  name: string;
  email: string;
  age: number = 17;
  verified: boolean = false;
  faTimes = faTimes;

  onClick() {
    this.closeModal.emit();
  }

  onSubmit() {
    if (!this.name || !this.email) {
      alert('Please fill all fields...');
      return;
    }

    const newUser = {
      id: this.total + 1,
      name: this.name,
      age: this.age,
      verified: this.verified,
      email: this.email || '',
    };
    this.handleSubmit.emit(newUser);
    this.name = '';
    this.age = 2;
    this.verified = false;
    this.email = '';
  }
}
