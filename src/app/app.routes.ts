import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/courses',
    pathMatch: 'full'
  },
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.routes').then((m) => m.coursesRoutes)
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
