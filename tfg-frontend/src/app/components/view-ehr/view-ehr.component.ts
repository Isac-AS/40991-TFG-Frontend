import { Component, Input } from '@angular/core';
import { HealthRecord, IndividualOutput } from 'src/app/models/health-record.model';

@Component({
  selector: 'app-view-ehr',
  templateUrl: './view-ehr.component.html',
  styleUrls: ['./view-ehr.component.scss']
})
export class ViewEhrComponent{

  @Input() selectedRecord!: HealthRecord;

  constructor() { }
}
