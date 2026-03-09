import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/courses',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'courses',
    canActivate: [authGuard],
    loadChildren: () => import('./courses/courses.routes').then((m) => m.coursesRoutes)
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
