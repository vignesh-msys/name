import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CanDeactivateGaurd } from 'src/app/services/candeactivate.service';
import { AuthGaurd } from 'src/gaurd/auth-gaurd.service';
import { NoUserComponent } from '../no-user/no-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UsersComponent } from './users/users.component';

const userRoutes = [
  {
    path: 'new',
    component: CreateUserComponent,
    canDeactivate: [CanDeactivateGaurd],
    title: 'Create User',
    canActivate: [AuthGaurd],
  },
  {
    path: 'user/:id/edit',
    component: CreateUserComponent,
    canActivate: [AuthGaurd],
    title: 'Edit User',
  },
  {
    path: 'user',
    component: UsersComponent,
    canActivate: [AuthGaurd],
    children: [
      { path: '', component: NoUserComponent },
      {
        path: ':id',
        component: UserDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports : [RouterModule]
})
export class UserRoutes {}
