import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CreateUserComponent } from './components/user/create-user/create-user.component';
import { AppRouter } from 'src/route/app-route.module';
import { NoUserComponent } from './components/no-user/no-user.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { CanDeactivateGaurd } from './services/candeactivate.service';
import { TestComponent } from './components/test/test.component';
import { AuthComponent } from './auth/auth.component';
import { AuthHandler } from './auth/auth-interceptor.service';
import { UserModule } from './components/user/user.module';
import { SharedModule } from './components/shared.modules';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CreateUserComponent,
    NoUserComponent,
    SearchResultComponent,
    TestComponent,
    AuthComponent,
  ],
  imports: [BrowserModule, AppRouter, UserModule, SharedModule],
  providers: [
    CanDeactivateGaurd,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHandler,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
