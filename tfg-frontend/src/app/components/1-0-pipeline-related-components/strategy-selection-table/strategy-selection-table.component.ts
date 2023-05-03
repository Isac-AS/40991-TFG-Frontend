import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalService } from 'src/app/services/global.service';
import { MatDialog } from '@angular/material/dialog';
import { Strategy } from 'src/app/models/strategy.model';
import { StrategyAPIService } from 'src/app/services/strategy-api.service';

@Component({
  selector: 'app-strategy-selection-table',
  templateUrl: './strategy-selection-table.component.html',
  styleUrls: ['./strategy-selection-table.component.scss']
})
export class StrategySelectionTableComponent implements OnChanges {

  @Input() selectionStage: '1' | '2' | '3' = '1';
  @Output() selectedStrategyEmitter: any = new EventEmitter<any>();

  strategyList: Strategy[] = [];
  displayedColumns: string[] = ['selected', 'name', 'description', 'stage', 'created_by']
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

  ngOnChanges(changes: SimpleChanges): void {
    let updatedSelectionStage = changes['selectionStage'].currentValue;
    this.selectionStage = updatedSelectionStage;
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
        if (this.debug) {
          console.log("[DEBUG] - [STRATEGY-SELECTION-TABLE-COMPONENT]: Strategies fetched response:");
          console.log(strategies);
          console.log("*---*");
        }
        this.strategyList = strategies;
        if (this.selectionStage == '1') {
          this.strategyList = this.strategyList.filter(item => item.stage == "Voz a texto");
        } else if (this.selectionStage == '2') {
          this.strategyList = this.strategyList.filter(item => item.stage !== "Voz a texto");
        }
        if (this.debug) {
          console.log("[DEBUG] - [STRATEGY-SELECTION-TABLE-COMPONENT]: Resulting strategy list:");
          console.log(this.strategyList);
          console.log("Selection stage", this.selectionStage);
          console.log("*---*");
        }
        this.dataSource = new MatTableDataSource(this.strategyList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  emitStrategy(strategy: any) {
    this.selectedStrategyEmitter.emit(strategy)
  }
}