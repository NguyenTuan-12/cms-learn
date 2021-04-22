import { Routes } from '@angular/router';
import { Error404Component } from '../../main/errors/404/error-404.component';

export const CmsRoutes: Routes = [
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#AppDashboardModule'
  },
  {
    path: 'blog',
    loadChildren: './blog/blog.module#BlogModule'
  },
  {
    path: 'system',
    loadChildren: './system/system.module#AppSystemModule'
  },
  {
    path: '**',
    component: Error404Component
  }
];
