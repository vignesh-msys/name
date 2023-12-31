import { Injectable } from '@angular/core';
import { User } from '../interface/user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOpt = {
  headers: new HttpHeaders({
    'content-type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  data: User[];
  private apiUrl = 'http://localhost:3000/users';

  constructor(private api: HttpClient) {}

  getUserData(): Observable<User[]> {
    return this.api.get<User[]>(this.apiUrl);
  }

  getuserById(id: number): Observable<User> {
    const url = `${this.apiUrl}/${id}`;
    return this.api.get<User>(url);
  }

  deleteUser(user: User): Observable<User> {
    const url = `${this.apiUrl}/${user.id}`;
    return this.api.delete<User>(url);
  }

  updateUser(user: User, id: number): Observable<User> {
    const url = `${this.apiUrl}/${id}`;
    return this.api.put<User>(url, user, httpOpt);
  }

  addUsers(user: User): Observable<User> {
    return this.api.post<User>(this.apiUrl, user);
  }
}
