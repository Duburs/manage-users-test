import { Component, inject } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { UsersDataService } from '../../data/users-data.service';
@Component({
  selector: 'app-grid-remove-button',
  standalone: true,
  imports: [],
  templateUrl: './grid-remove-button.component.html',
  styleUrl: './grid-remove-button.component.scss',
})
export class GridRemoveButtonComponent implements ICellRendererAngularComp {
  userId!: string;
  usersDataService = inject(UsersDataService);

  agInit(params: ICellRendererParams<any, any, any>): void {
    this.userId = params.data.id;
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return true;
  }

  removeUser(): void {
    this.usersDataService.removeUser(this.userId);
  }
}
