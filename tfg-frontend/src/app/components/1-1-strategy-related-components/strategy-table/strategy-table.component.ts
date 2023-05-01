import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalService } from 'src/app/services/global.service';
import { MatDialog } from '@angular/material/dialog';
import { Strategy } from 'src/app/models/strategy.model';
import { StrategyAPIService } from 'src/app/services/strategy-api.service';
import { EntryDeletionDialogComponent } from '../../entry-deletion-dialog/entry-deletion-dialog.component';

@Component({
  selector: 'app-strategy-table',
  templateUrl: './strategy-table.component.html',
  styleUrls: ['./strategy-table.component.scss']
})
export class StrategyTableComponent {

  @Output() selectedStrategyEmitter: any = new EventEmitter<any>()

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

  debug: boolean = false;

  constructor(
    private strategyAPI: StrategyAPIService,
    public dialog: MatDialog,
    public globalService: GlobalService
  ) {
    this.dataSource = new MatTableDataSource(this.strategyList);
    this.fetchStrategies();
    this.globalService.debug.subscribe({
      next: newValue => {
        this.debug = newValue;
      }
    })
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
        if (this.debug) {
          console.log("[DEBUG] - [STRATEGY-TABLE-COMPONENT]: Strategies fetched response:");
          console.log(strategies);
          console.log("*---*");
        }
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
        if (this.debug) {
          console.log("[DEBUG] - [STRATEGY-TABLE-COMPONENT]: Strategy deletion dialog result:");
          console.log(result)
          console.log("*---*");
        }
      }
    )
  }

  deleteStrategy(strategy_id: number) {
    this.strategyAPI.deleteStrategy(strategy_id).subscribe(
      (response) => {
        if (this.debug) {
          console.log("[DEBUG] - [STRATEGY-TABLE-COMPONENT]: Strategy deletion response:");
          console.log(response)
          console.log("*---*");
        }
        this.fetchStrategies();
      }
    )
  }

  emitStrategy(strategy: any) {
    this.selectedStrategyEmitter.emit(strategy)
  }

}