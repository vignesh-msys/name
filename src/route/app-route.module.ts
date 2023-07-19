import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CreateUserComponent } from 'src/app/components/create-user/create-user.component';
import { NoUserComponent } from 'src/app/components/no-user/no-user.component';
import { SearchResultComponent } from 'src/app/components/search-result/search-result.component';
import { UserDetailsComponent } from 'src/app/components/user-details/user-details.component';
import { UsersComponent } from 'src/app/components/users/users.component';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { CanDeactivateGaurd } from 'src/app/services/candeactivate.service';
import { AuthGaurd } from 'src/gaurd/auth-gaurd.service';
// import { AuthGuard } from 'src/gaurd/auth-gaurd.service';

const appRoute: Route[] = [
  {
    path: 'new',
    component: CreateUserComponent,
    canDeactivate: [CanDeactivateGaurd],
    title: 'Create User',
  },
  {
    path: 'search',
    component: SearchResultComponent,
  },
  {
    path: ':id/edit',
    component: CreateUserComponent,
    canActivate: [AuthGaurd],
    title: 'Edit User',
  },
  {
    path: '',
    component: UsersComponent,
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
  imports: [
    RouterModule.forRoot(appRoute, {
      enableTracing: false,
    }),
  ],
  exports: [RouterModule],
})
export class AppRouter {}
