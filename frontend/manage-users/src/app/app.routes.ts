import { Routes } from '@angular/router';
/* import { LoggedInGuard } from './guards/logged-in.guard'; */

export const routes: Routes = [
  {
    path: 'manage-users',
    loadChildren: () => import('./routes/manage-users/manage-users.routes'),
    /*     canActivate: [LoggedInGuard], */
  },
  {
    path: '**',
    redirectTo: '/manage-users',
  },
];
