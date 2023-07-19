import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { AppRouter } from 'src/route/app-route.module';
import { UsersComponent } from './components/users/users.component';
import { UserItemComponent } from './components/user-item/user-item.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { NoUserComponent } from './components/no-user/no-user.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { CanDeactivateGaurd } from './services/candeactivate.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CreateUserComponent,
    UsersComponent,
    UserItemComponent,
    UserDetailsComponent,
    NoUserComponent,
    SearchResultComponent,
  ],
  imports: [
    BrowserModule,
    AppRouter,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [CanDeactivateGaurd],
  bootstrap: [AppComponent],
})
export class AppModule {}
