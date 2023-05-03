import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalService } from 'src/app/services/global.service';
import { MatDialog } from '@angular/material/dialog';
import { Pipeline } from 'src/app/models/pipeline.model';
import { PipelineAPIService } from 'src/app/services/pipepile-api.service';
import { EntryDeletionDialogComponent } from '../../entry-deletion-dialog/entry-deletion-dialog.component';

@Component({
  selector: 'app-pipeline-table',
  templateUrl: './pipeline-table.component.html',
  styleUrls: ['./pipeline-table.component.scss']
})
export class PipelineTableComponent {

  @Output() selectedPipelineEmitter: any = new EventEmitter<any>()

  pipelineList: Pipeline[] = [];
  displayedColumns: string[] = ['selected', 'name', 'description', 'created_by', 'last_modified_by', 'strategies', 'delete']
  dataSource: MatTableDataSource<Pipeline>;

  selectedPipeline: Pipeline = {
    name: 'Ninguno',
    description: '',
    strategies: [{
      id: -1,
      name: '',
      stage: ""
    }],

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
    private pipelineAPI: PipelineAPIService,
    public dialog: MatDialog,
    public globalService: GlobalService
  ) {
    this.dataSource = new MatTableDataSource(this.pipelineList);
    this.fetchPipelines();
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

  fetchPipelines() {
    this.pipelineAPI.getAllPipelines().subscribe({
      next: (pipelines) => {
        if (this.debug) {
          console.log("[DEBUG] - [PIPELINE-TABLE-COMPONENT]: Pipelines fetched response:");
          console.log(pipelines);
          console.log("*---*");
        }
        this.pipelineList = pipelines;
        this.dataSource = new MatTableDataSource(this.pipelineList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  openDeletionDialog(pipeline_id: number) {
    const dialogRef = this.dialog.open(EntryDeletionDialogComponent)
    dialogRef.afterClosed().subscribe(
      result => {
        if (result == true) {
          this.deletePipeline(pipeline_id)
        }
        if (this.debug) {
          console.log("[DEBUG] - [PIPELINE-TABLE-COMPONENT]: Pipeline deletion dialog result:");
          console.log(result);
          console.log("*---*");
        }
      }
    )
  }

  deletePipeline(pipeline_id: number) {
    this.pipelineAPI.deletePipeline(pipeline_id).subscribe(
      (response) => {
        if (this.debug) {
          console.log("[DEBUG] - [PIPELINE-TABLE-COMPONENT]: Pipeline deletion response:");
          console.log(response);
          console.log("*---*");
        }
        this.fetchPipelines();
      }
    )
  }

  emitPipeline(pipeline: any) {
    this.selectedPipelineEmitter.emit(pipeline)
  }

}
