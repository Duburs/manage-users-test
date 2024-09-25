import { Route } from '@angular/router';
import { ViewUsersComponent } from './view-users/view-users.component';
import { AddUsersComponent } from './add-users/add-users.component';

export default [
  {
    path: 'view',
    component: ViewUsersComponent,
  },
  {
    path: 'add',
    component: AddUsersComponent,
  },
  {
    path: '**',
    redirectTo: 'view',
  },
] satisfies Route[];
