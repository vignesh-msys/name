import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared.modules';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserItemComponent } from './user-item/user-item.component';
import { UserRoutes } from './user.route.module';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [UsersComponent, UserItemComponent, UserDetailsComponent],
  imports: [RouterModule, UserRoutes, SharedModule],
})
export class UserModule {}
