import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalService } from 'src/app/services/global.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Strategy } from 'src/app/models/strategy.model';
import { StrategyAPIService } from 'src/app/services/strategy-api.service';
import { EntryDeletionDialogComponent } from '../entry-deletion-dialog/entry-deletion-dialog.component';

@Component({
  selector: 'app-strategy-table',
  templateUrl: './strategy-table.component.html',
  styleUrls: ['./strategy-table.component.scss']
})
export class StrategyTableComponent {

  strategyList: Strategy[] = [];
  displayedColumns: string[] = ['selected', 'name', 'input_type', 'output_type', 'stage', 'created_by', 'last_modified_by', 'delete']
  dataSource: MatTableDataSource<Strategy>;

  selectedStrategy: Strategy = {
    name: 'Ninguno',
    description: '',
    python_file_path: '',
    env_path: '',
    input_type: '',
    output_type: '',
    stage: '',

    id: -1,
    updated_at: '',
    created_at: '',
    created_by: '',
    last_modified_by: '',
  }

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort) sort: any = MatSort;

  constructor(
    private strategyAPI: StrategyAPIService,
    public dialog: MatDialog,
  ) { 
    this.dataSource = new MatTableDataSource(this.strategyList);
    this.fetchStrategies();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchStrategies() {
    this.strategyAPI.getAllStrategies().subscribe({
      next: (strategies) => {
        console.log(strategies)
        this.strategyList = strategies;
        this.dataSource = new MatTableDataSource(this.strategyList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  openDeletionDialog(strategy_id: number) {
    const dialogRef = this.dialog.open(EntryDeletionDialogComponent)
    dialogRef.afterClosed().subscribe(
      result => {
        if (result == true) {
          this.deleteStrategy(strategy_id)
        }
        console.log(result)
      }
    )
  }

  deleteStrategy(strategy_id: number) {
    this.strategyAPI.deleteStrategy(strategy_id).subscribe(
      (response) => {
        console.log(response)
        this.fetchStrategies();
      }
    )
  }

}