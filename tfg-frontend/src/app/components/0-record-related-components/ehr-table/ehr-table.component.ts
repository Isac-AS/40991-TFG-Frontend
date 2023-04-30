import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HealthRecord } from 'src/app/models/health-record.model';
import { HeathRecordAPIService } from 'src/app/services/health-record-api.service';
import { EntryDeletionDialogComponent } from '../../entry-deletion-dialog/entry-deletion-dialog.component';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-ehr-table',
  templateUrl: './ehr-table.component.html',
  styleUrls: ['./ehr-table.component.scss']
})
export class EhrTableComponent {

  @Output() selectedRecordEmitter: any = new EventEmitter<any>()

  recordList: HealthRecord[] = [];
  displayedColumns: string[] = ['selected', 'created_at', 'transcription', 'health_record', 'created_by', 'last_modified_by', 'delete']
  dataSource: MatTableDataSource<HealthRecord>;

  selectedRecord: HealthRecord = {
    recording_path: '',
    transcription: '',
    health_record: '',
    processing_outputs: [],

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
    private healthRecordAPI: HeathRecordAPIService,
    public dialog: MatDialog,
    public globalService: GlobalService
  ) {
    this.dataSource = new MatTableDataSource(this.recordList);
    this.fetchRecords();
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

  fetchRecords() {
    this.healthRecordAPI.getAllRecords().subscribe({
      next: (records) => {
        if (this.debug) {
          console.log("[DEBUG] - [RECORD-TABLE-COMPONENT]: Records fetched response:");
          console.log(records);
          console.log("*---*");
        }
        this.recordList = records;
        this.dataSource = new MatTableDataSource(this.recordList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  openDeletionDialog(record_id: number) {
    const dialogRef = this.dialog.open(EntryDeletionDialogComponent)
    dialogRef.afterClosed().subscribe(
      result => {
        if (result == true) {
          this.deleteRecord(record_id)
        }
        if (this.debug) {
          console.log("[DEBUG] - [RECORD-TABLE-COMPONENT]: Record deletion dialog result:");
          console.log(result);
          console.log("*---*");
        }
      }
    )
  }

  deleteRecord(record_id: number) {
    this.healthRecordAPI.deleteHealthRecord(record_id).subscribe(
      (response) => {
        if (this.debug) {
          console.log("[DEBUG] - [RECORD-TABLE-COMPONENT]: Record deletion response:");
          console.log(response);
          console.log("*---*");
        }
        this.fetchRecords();
      }
    )
  }

  emitRecord(record: any) {
    this.selectedRecordEmitter.emit(record)
  }
}
