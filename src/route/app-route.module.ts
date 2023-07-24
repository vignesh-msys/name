import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AuthComponent } from 'src/app/auth/auth.component';
import { SearchResultComponent } from 'src/app/components/search-result/search-result.component';
import { TestComponent } from 'src/app/components/test/test.component';
import { AuthGaurd } from 'src/gaurd/auth-gaurd.service';

const appRoute: Route[] = [
  {
    path: 'search',
    component: SearchResultComponent,
    canActivate: [AuthGaurd],
  },
  {
    path: 'test',
    component: TestComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full',
  },
  // {
  //   path:'user',
  //   loadChildren : ()=>import('../app/components/user/user.module').then(m => m.UserModule)
  // }
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
