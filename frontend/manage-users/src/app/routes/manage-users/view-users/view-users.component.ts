import { Component, inject } from '@angular/core';
import { UsersDataService } from '../data/users-data.service';
import { CommonModule, DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { RouterModule } from '@angular/router';
import { GridRemoveButtonComponent } from './grid-remove-button/grid-remove-button.component';
import { FormsModule } from '@angular/forms';
import { ButtonToggleComponent } from '../../../components/button-toggle/button-toggle.component';
import { Roles } from '../roles.interface';
import { DropdownComponent } from '../../../components/dropdown/dropdown.component';

@Component({
  selector: 'app-view-users',
  standalone: true,
  imports: [
    CommonModule,
    AgGridAngular,
    RouterModule,
    GridRemoveButtonComponent,
    FormsModule,
    ButtonToggleComponent,
    DropdownComponent,
  ],
  templateUrl: './view-users.component.html',
  styleUrl: './view-users.component.scss',
  providers: [
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { dateFormat: 'short' },
    },
  ],
})
export class ViewUsersComponent {
  usersDataService = inject(UsersDataService);

  rowData = this.usersDataService.currentData$;

  roles = Object.values(Roles);

  filterUsername = false;
  usernameFilterValue = '';
  filterRole = false;
  roleFilterValue = 'Select a role';

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    {
      field: 'disabled',
      cellRenderer: 'agCheckboxCellRenderer',
      cellEditor: 'agCheckboxCellEditor',
      editable: (e) => true,
      onCellValueChanged: (event) =>
        this.usersDataService.updateUser(event.data),
      width: 25,
      headerValueGetter: (params) => '',
    },
    {
      field: 'username',
      editable: (e) => e.data.disabled !== true,
      onCellValueChanged: (event) =>
        this.usersDataService.updateUser(event.data),
    },
    {
      field: 'role',
      editable: (e) => e.data.disabled !== true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: [...Object.values(Roles)],
      },
      onCellValueChanged: (event) =>
        this.usersDataService.updateUser(event.data),
    },
    {
      field: 'creation_date',
      valueFormatter: (params) => {
        return new Date(params.value?.seconds * 1000)?.toLocaleString();
      },
      editable: false,
      headerValueGetter: () => 'Creation Date',
    },
    { field: '', width: 80, cellRenderer: GridRemoveButtonComponent },
  ];

  gridOptions = {
    onGridReady: (event: GridReadyEvent) => {
      event.api.sizeColumnsToFit();
    },
  };

  search(): void {
    this.usersDataService.filterData(
      this.usernameFilterValue,
      this.roleFilterValue
    );
  }

  handleUsernameFilterChange(value: boolean): void {
    if (!value) {
      this.usernameFilterValue = '';
    }
    this.filterUsername = value;
    this.search();
  }

  handleRoleFilterChange(value: boolean): void {
    if (!value) {
      this.roleFilterValue = 'Select a role';
    }
    this.filterRole = value;
    this.search();
  }
}
