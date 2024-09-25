import { Component, inject } from '@angular/core';
import { UsersDataService } from '../data/users-data.service';
import { CommonModule, DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent, GridOptions } from 'ag-grid-community';
import { RouterModule } from '@angular/router';
import { GridRemoveButtonComponent } from './grid-remove-button/grid-remove-button.component';
import { FormsModule } from '@angular/forms';
import { Roles } from '../roles.interface';
import { DropdownComponent } from '../../../components/dropdown/dropdown.component';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-view-users',
  standalone: true,
  imports: [
    CommonModule,
    AgGridAngular,
    RouterModule,
    GridRemoveButtonComponent,
    FormsModule,
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

  rowData$ = this.usersDataService.currentData$;

  roles = Object.values(Roles);

  filterUsername = false;
  usernameFilterValue = '';
  filterRole = false;
  // Provides a default option for the role filter dropdown.
  roleFilterValue = 'filter by a role';

  // Sets up the col definitions for ag-grid.
  colDefs: ColDef[] = [
    {
      field: 'enabled',
      cellRenderer: 'agCheckboxCellRenderer',
      cellEditor: 'agCheckboxCellEditor',
      editable: (e) => true,
      onCellValueChanged: (event) =>
        this.usersDataService.updateUser(event.data),
      minWidth: 45,
      maxWidth: 45,
      headerValueGetter: (params) => '',
      lockPosition: 'left',
      sortable: false,
    },
    {
      field: 'username',
      minWidth: 120,
      editable: (e) => e.data.enabled === true,
      onCellValueChanged: (event) =>
        this.usersDataService.updateUser(event.data),
    },
    {
      field: 'role',
      editable: (e) => e.data.enabled === true,
      cellEditor: 'agSelectCellEditor',
      minWidth: 120,
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
      minWidth: 120,
      headerValueGetter: () => 'Creation Date',
    },
    {
      field: '',
      minWidth: 190,
      maxWidth: 190,
      resizable: false,
      lockPosition: 'right',
      cellRenderer: GridRemoveButtonComponent,
      sortable: false,
    },
  ];

  gridOptions: GridOptions = {
    onGridReady: (event: GridReadyEvent) => {
      event.api.sizeColumnsToFit();
    },
  };

  // Debounce for the search to avoid sending too many requests as the user types.
  private searchDebounce$ = new Subject<void>();
  constructor() {
    this.searchDebounce$.pipe(debounceTime(200)).subscribe(() => {
      this.performSearch();
    });
  }

  // Calls the data serviec which will update the source of the data to the filtered data.
  private performSearch(): void {
    let _roleFilterValue: string = this.roleFilterValue;

    // The component outputs the placeholder as the default value so this should be an empty string.
    if (this.roleFilterValue === 'filter by a role') {
      _roleFilterValue = '';
    }

    // Calls the data service to update the source of the data. It'll be reflected in the
    // currentData$ observable.
    this.usersDataService.filterData(
      this.usernameFilterValue,
      _roleFilterValue
    );
  }

  search(): void {
    this.searchDebounce$.next();
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
      this.roleFilterValue = '';
    }
    this.filterRole = value;
    // Skipping the debounce to avoid the delay when the user selects the filter.
    this.performSearch();
  }
}
