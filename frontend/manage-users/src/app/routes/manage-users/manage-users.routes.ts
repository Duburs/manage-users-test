import { Route } from '@angular/router';
import { ManageUsersComponent } from './manage-users.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { AddUsersComponent } from './add-users/add-users.component';

export default [
  {
    path: '',
    component: ManageUsersComponent,
  },
  {
    path: 'view',
    component: ViewUsersComponent,
  },
  {
    path: 'add',
    component: AddUsersComponent,
  },
] satisfies Route[];
