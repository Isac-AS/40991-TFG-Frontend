import { Component, OnInit } from '@angular/core';
import { HealthRecord, IndividualOutput } from 'src/app/models/health-record.model';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-view-records-page',
  templateUrl: './view-records-page.component.html',
  styleUrls: ['./view-records-page.component.scss']
})
export class ViewRecordsPageComponent {

  selectedRecord: HealthRecord = {
    recording_path: '',
    transcription: '',
    health_record: '',
    processing_outputs: [],
    parent_id: null,

    id: -1,
    updated_at: '',
    created_at: '',
    created_by: '',
    last_modified_by: '',
  }

  constructor(
    public globalService: GlobalService,
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Ver Registros'
    })
  }

  updateSelectedRecord(record: any) {
    this.selectedRecord = record
  }
}
